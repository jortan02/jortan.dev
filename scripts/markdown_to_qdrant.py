from dotenv import load_dotenv
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
import markdown
from bs4 import BeautifulSoup
import glob
import os
import json
import hashlib

config = json.load(open("config.json"))

load_dotenv(".env.local")

embedding_model = HuggingFaceEmbeddings(
    model_name=config["EMBEDDING_MODEL_NAME"]
)

# Delete old collection
client = QdrantClient(
    url=os.environ["QDRANT_URL"], api_key=os.environ["QDRANT_API_KEY"]
)
client.delete_collection(collection_name=config["COLLECTION_NAME"])

def hash_file_name(path: str) -> str:
    """Hash the file path to use as a unique Qdrant ID."""
    return hashlib.md5(path.encode()).hexdigest()

# Embed markdown files
texts = []
metadata = []
for md_path in glob.glob(f"{config["SOURCE_DIR"]}/*.md"):
    with open(md_path, "r", encoding="utf-8") as f:
        raw_md = f.read()
        html = markdown.markdown(raw_md)
        soup = BeautifulSoup(html, "html.parser")
        plain_text = soup.get_text()

        texts.append(plain_text)
        metadata.append({"path": md_path, "raw_md": raw_md})

# Upload files
qdrant = QdrantVectorStore.from_texts(
    texts=texts,
    metadatas=metadata,
    embedding=embedding_model,
    collection_name=config["COLLECTION_NAME"],
    url=os.environ["QDRANT_URL"],
    api_key=os.environ["QDRANT_API_KEY"]
)

print(f"Uploaded {len(texts)} texts to Qdrant.")
