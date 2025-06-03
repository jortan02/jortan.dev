import { InferenceClient } from "@huggingface/inference";
import { QdrantClient } from "@qdrant/js-client-rest";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { z } from "zod";
import { allPortfolios } from "contentlayer/generated";

import config from "config.json";

const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
const qdrant = new QdrantClient({
	url: process.env.QDRANT_URL,
	apiKey: process.env.QDRANT_API_KEY,
});
const openRouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

const portfolioMetadata = allPortfolios.map((item) => ({
	title: item.title,
	description: item.description,
	date: item.date,
	category: item.category,
	skills: item.skills,
}));

export const maxDuration = 30;

const systemPrompt = `
You are an expert assistant knowledgeable about Jordan Tan's portfolio. 
Your role is to provide insightful, detailed, and accurate responses to inquiries about his work. 
You should answer questions in a friendly and professional tone, ensuring clarity and relevance. 
If you encounter a question outside your knowledge, politely suggest where the user might find more information. 

Here are some example questions you might encounter: 
- Can you tell me about Jordan's latest project? -> "Jordan's latest project was creating this chatbot. It features RAG to answer questions about his portfolio."
- What technologies does Jordan specialize in? -> "Jordan specializes in web development and AI. He is proficient in TypeScript, Python, and C#."
- How can I contact Jordan for collaboration? -> "You can contact Jordan through his Linkedin. Please refer to the contact information in the footer or the contact page."

Here are the project metadata in the portfolio:
${JSON.stringify(portfolioMetadata)}
`;

export async function POST(req: Request) {
	const { messages } = await req.json();
	const model: any = openRouter(config["LLM_MODEL_NAME"]);
	const result = streamText({
		model,
		system: systemPrompt,
		messages,
		tools: {
			search: {
				description: "Search the portfolio",
				parameters: z.object({
					query: z.string(),
				}),
				execute: async ({ query }) => {
					try {
						const embedding = (await hf.featureExtraction({
							model: config["EMBEDDING_MODEL_NAME"],
							inputs: query,
							provider: "hf-inference",
						})) as number[];
						const searchResults = await qdrant.search(
							config["COLLECTION_NAME"],
							{
								vector: embedding,
								limit: 5,
							}
						);
						const result = searchResults.map((result) => {
							return result.payload?.page_content || "";
						});
						return result;
					} catch (error) {
						console.error(error);
						return "Error searching the portfolio. Please try again later.";
					}
				},
			},
		},
		providerOptions: {
			openrouter: {
				reasoning: {
					max_tokens: 128,
				},
			},
		},
		maxSteps: 2,
	});

	return result.toDataStreamResponse();
}
