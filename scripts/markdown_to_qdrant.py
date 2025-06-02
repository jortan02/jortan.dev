import os
import glob
import hashlib
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
import markdown

# Config
COLLECTION_NAME = "portfolio"
SOURCE_DIR = "src/content/portfolio"

# Initialize embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")
embedding_dim = model.get_sentence_embedding_dimension()

# Connect to Qdrant
client = QdrantClient(
    url=os.environ["QDRANT_URL"],
    api_key=os.environ["QDRANT_API_KEY"]
)

# Ensure collection exists
client.recreate_collection(
    collection_name=COLLECTION_NAME,
    vectors_config=VectorParams(size=embedding_dim, distance=Distance.COSINE)
)

def hash_file_name(path: str) -> str:
    """Hash the file path to use as a unique Qdrant ID."""
    return hashlib.md5(path.encode()).hexdigest()

# Load and embed markdown files
points = []
for md_path in glob.glob(f"{SOURCE_DIR}/*.md"):
    with open(md_path, "r", encoding="utf-8") as f:
        raw_md = f.read()
        html = markdown.markdown(raw_md)  # Preprocess markdown
        embedding = model.encode(html)

        point_id = hash_file_name(md_path)
        points.append(
            PointStruct(
                id=point_id,
                vector=embedding.tolist(),
                payload={"path": md_path, "raw_md": raw_md}
            )
        )

# Upload to Qdrant
if points:
    client.upsert(collection_name=COLLECTION_NAME, points=points)
    print(f"Uploaded {len(points)} markdown files to Qdrant.")
else:
    print("No markdown files found.")
