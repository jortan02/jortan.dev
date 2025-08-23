import { InferenceClient } from "@huggingface/inference";
import { QdrantClient } from "@qdrant/js-client-rest";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import config from "config.json";
import { NextResponse } from 'next/server';
import { createSystemPrompt } from "@/lib/prompts";
import { createSearchPortfolioTool } from "@/lib/rag";

const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});
const openRouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const model: any = openRouter(config["LLM_MODEL_NAME"]);
    
    const result = await generateText({
        model,
        system: createSystemPrompt(),
        messages,
        tools: {
            searchPortfolio: createSearchPortfolioTool(hf, qdrant)
        },
		providerOptions: {
			openrouter: {
				reasoning: {
					max_tokens: 128,
				},
			},
		},
		maxSteps: 5,
    });

    let retrievedContexts: string[] = [];
    if (result.steps[0]?.toolResults?.length) {
        retrievedContexts = result.steps[0].toolResults.flatMap(toolResult => toolResult.result);
    }

    return NextResponse.json({
        answer: result.text,
        contexts: retrievedContexts,
    });
}
