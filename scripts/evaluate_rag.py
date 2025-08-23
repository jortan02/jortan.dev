import os
import json
import requests
from dotenv import load_dotenv
from ragas.evaluation import evaluate 
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_recall,
    context_precision,
)
from langchain_openai import ChatOpenAI
from langchain_huggingface import HuggingFaceEmbeddings
from datasets import Dataset, Features, Value, Sequence

from ragas.llms import LangchainLLMWrapper
from ragas.embeddings import LangchainEmbeddingsWrapper

load_dotenv(".env.local")

with open('config.json', 'r') as f:
    config = json.load(f)
    
# Set up the judge LLM and embeddings

judge_llm_langchain = ChatOpenAI(
    model=config["JUDGE_LLM_MODEL_NAME"],
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "jortan.dev-evaluation",
    }
)
judge_llm = LangchainLLMWrapper(judge_llm_langchain)

embeddings_model_langchain = HuggingFaceEmbeddings(
    model_name=config["EMBEDDING_MODEL_NAME"]
)
embeddings_model = LangchainEmbeddingsWrapper(embeddings_model_langchain)


faithfulness.llm = judge_llm
answer_relevancy.llm = judge_llm
context_recall.llm = judge_llm
context_precision.llm = judge_llm
faithfulness.embeddings = embeddings_model
answer_relevancy.embeddings = embeddings_model
context_recall.embeddings = embeddings_model
context_precision.embeddings = embeddings_model


# Load the golden dataset
with open('scripts/golden_dataset.json', 'r') as f:
    golden_dataset = json.load(f)

def get_rag_response(question):
    """
    Queries the dedicated evaluation endpoint and ensures a valid JSON response.
    """
    try:
        response = requests.post(
            "http://localhost:3000/api/chat/evaluate",
            json={"messages": [{"role": "user", "content": question}]},
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error calling API for question '{question}': {e}")
    except json.JSONDecodeError:
        print(f"Error: API response for question '{question}' was not valid JSON.")
    
    return {
        "answer": "Error: Failed to get a valid response from the API.",
        "contexts": []
    }

# Prepare the data for evaluation
data_samples = []
for item in golden_dataset:
    data_samples.append({
        "question": item["question"],
        "ground_truth": item["answer"],
    })

print("Querying the RAG API for each question in the golden dataset...")
results = [get_rag_response(item["question"]) for item in data_samples]

# Add RAG system outputs to our samples
for i, result in enumerate(results):
    data_samples[i]["answer"] = str(result.get("answer", ""))
    data_samples[i]["contexts"] = result.get("contexts", [])

# Define the features with the correct data types
features = Features({
    'question': Value('string'),
    'answer': Value('string'),
    'contexts': Sequence(Value('string')),
    'ground_truth': Value('string')
})

# Create the Dataset using the explicit schema
dataset = Dataset.from_dict({
    "question": [s["question"] for s in data_samples],
    "answer": [s["answer"] for s in data_samples],
    "contexts": [s["contexts"] for s in data_samples],
    "ground_truth": [s["ground_truth"] for s in data_samples],
}, features=features)


print("\nDataset prepared for evaluation. Running Ragas...")

result = evaluate(
	dataset,
	metrics=[
		context_precision,
		context_recall,
		faithfulness,
		answer_relevancy,
	]
)
print("\n--- RAG Evaluation Results ---")
print(result)


# Threshold check
if __name__ == "__main__":
    evaluation_scores = result.to_pandas()
    print("\n Wrote Raw Evaluation Scores (per sample) to evaluation_scores.csv")
    script_dir = os.path.dirname(__file__)
    output_path = os.path.join(script_dir, "evaluation_scores.csv")
    evaluation_scores.to_csv(output_path, index=False)

    # Aggregate means for each metric
    mean_scores = evaluation_scores.mean(numeric_only=True)
    print("\n--- Mean Evaluation Scores ---")
    print(mean_scores)

    thresholds = {
        "context_precision": 0.8,
        "context_recall": 0.8,
        "faithfulness": 0.8,
        "answer_relevancy": 0.8,
    }

    passed = True
    print("\n--- Threshold Check ---")
    for metric, threshold in thresholds.items():
        if metric in mean_scores:
            score = mean_scores[metric]
            if score < threshold:
                print(f"❌ FAILED: {metric} score {score:.2f} is below threshold {threshold:.2f}")
                passed = False
            else:
                print(f"✅ PASSED: {metric} score {score:.2f} is at or above threshold {threshold:.2f}")
        else:
            print(f"⚠️ Metric '{metric}' not found in evaluation results.")

    if not passed:
        exit(1)
