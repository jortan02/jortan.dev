from dotenv import load_dotenv
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
import glob
import os
import json
import re

config = json.load(open("config.json"))

load_dotenv(".env.local")

embedding_model = HuggingFaceEmbeddings(
    model_name=config["EMBEDDING_MODEL_NAME"]
)

client = QdrantClient(
    url=os.environ["QDRANT_URL"], api_key=os.environ["QDRANT_API_KEY"]
)
client.delete_collection(collection_name=config["COLLECTION_NAME"])

# --- Semantic Chunking and Processing ---

all_texts = []
all_metadata = []

# Iterate over all markdown files in the source directory
for md_path in glob.glob(f"{config['SOURCE_DIR']}/*.md"):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

        # Extract the frontmatter (metadata) and the main markdown body
        parts = content.split('---', 2)
        if len(parts) < 3:
            continue # Skip files that don't have a valid frontmatter
        
        frontmatter_str, markdown_body = parts[1], parts[2]
        
        # Extract the project title from the frontmatter
        title_match = re.search(r'title:\s*(.*)', frontmatter_str)
        category_match = re.search(r'category:\s*(.*)', frontmatter_str)
        skills_match = re.search(r'skills:\s*\[(.*?)\]', frontmatter_str)

        project_title = title_match.group(1).strip() if title_match else "Unknown Project"
        category = category_match.group(1).strip() if category_match else "Uncategorized"
        skills = skills_match.group(1).strip() if skills_match else ""
        
        # Create the metadata header to prepend to each chunk
        metadata_header = f"Project: {project_title}\nCategory: {category}\nSkills: {skills}"

        # Split the markdown body by '###' headings
        # The first element will be the overview before the first '###'
        sections = re.split(r'\n###\s+', markdown_body)
        
        # The first section is the 'Overview', which doesn't start with '###'
        overview_section = sections[0].strip()
        # Remove the image link for cleaner chunking
        overview_section = re.sub(r'!\[.*\]\(.*\)', '', overview_section).strip()
        if overview_section:
            # Add the project title to the chunk for context
            chunk_text = f"{metadata_header}\n\nOverview:\n{overview_section}"
            all_texts.append(chunk_text)
            all_metadata.append({"source": md_path, "project_title": project_title})

        # Process the rest of the sections that start with a heading
        for section in sections[1:]:
            section_content = section.strip()
            
            # The heading is the first line of the section
            heading = section_content.split('\n', 1)[0]
            
            # Create a chunk with the project title and section heading for full context
            chunk_text = f"{metadata_header}\n\nSection: {heading}\n\n{section_content}"
            all_texts.append(chunk_text)
            all_metadata.append({"source": md_path, "project_title": project_title})

# Upload the new, semantically chunked documents to Qdrant
qdrant = QdrantVectorStore.from_texts(
    texts=all_texts,
    metadatas=all_metadata,
    embedding=embedding_model,
    collection_name=config["COLLECTION_NAME"],
    url=os.environ["QDRANT_URL"],
    api_key=os.environ["QDRANT_API_KEY"]
)

print(f"Successfully uploaded {len(all_texts)} semantic chunks to Qdrant.")
