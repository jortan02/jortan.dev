import os
import json
import requests
import pandas as pd
from dotenv import load_dotenv
from ragas.evaluation import evaluate
from ragas.metrics import answer_relevancy
from langchain_openai import ChatOpenAI
from langchain_huggingface import HuggingFaceEmbeddings
from datasets import Dataset, Features, Value, Sequence

from ragas.llms import LangchainLLMWrapper
from ragas.embeddings import LangchainEmbeddingsWrapper

load_dotenv(".env.local")

with open("config.json", "r") as f:
    config = json.load(f)

# Set up the judge LLM and embeddings
judge_llm_langchain = ChatOpenAI(
    model=config["JUDGE_LLM_MODEL_NAME"],
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "jortan.dev-evaluation",
    },
)
judge_llm = LangchainLLMWrapper(judge_llm_langchain)

embeddings_model_langchain = HuggingFaceEmbeddings(
    model_name=config["EMBEDDING_MODEL_NAME"]
)
embeddings_model = LangchainEmbeddingsWrapper(embeddings_model_langchain)


answer_relevancy.llm = judge_llm
answer_relevancy.embeddings = embeddings_model

# --- SCRIPT START ---

# Load the golden dataset for non-RAG evaluation
with open("scripts/golden_dataset_non_rag.json", "r") as f:
    golden_dataset = json.load(f)

# Get responses from the RAG system
data_samples = []
for item in golden_dataset:
    response = requests.post(
        "http://localhost:3000/api/chat/evaluate",
        json={"messages": [{"role": "user", "content": item["question"]}]},
    )
    response_json = response.json()
    data_samples.append(
        {
            "question": item["question"],
            "answer": response_json["answer"],
            "contexts": response_json["contexts"], # Will be empty
            "ground_truth": item["answer"],
        }
    )

# Create a dataset from the collected data
ds = Dataset.from_list(
    data_samples,
    features=Features(
        question=Value("string"),
        answer=Value("string"),
        contexts=Sequence(Value("string")),
        ground_truth=Value("string"),
    ),
)

# Evaluate the dataset using only answer relevancy
result = evaluate(
    ds,
    metrics=[
        answer_relevancy,
    ],
)

# Convert to DataFrame and save detailed results to CSV
evaluation_df = result.to_pandas()
evaluation_df.to_csv("scripts/evaluation_scores_non_rag.csv", index=False)
print("\n--- Detailed non-RAG evaluation scores saved to scripts/evaluation_scores_non_rag.csv ---")
print(result)

# Aggregate mean for answer relevancy
mean_score = evaluation_df["answer_relevancy"].mean()
print(f"\n--- Mean Answer Relevancy (Non-RAG Questions) ---")
print(f"{mean_score:.2f}")

threshold = 0.9

passed = True
print("\n--- Threshold Check ---")
if mean_score < threshold:
    print(
        f"❌ FAILED: answer_relevancy score {mean_score:.2f} is below threshold {threshold:.2f}"
    )
    passed = False
else:
    print(
        f"✅ PASSED: answer_relevancy score {mean_score:.2f} is at or above threshold {threshold:.2f}"
    )

if not passed:
    exit(1)