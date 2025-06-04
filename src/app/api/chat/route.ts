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
	skills: item.skills,
}));

export const maxDuration = 30;

const systemPrompt = `
You are an expert assistant knowledgeable about Jordan Tan's portfolio. 
Your role is to provide insightful, detailed, and accurate responses to inquiries about his work. 
You should answer questions in a friendly and professional tone, ensuring clarity and relevance. 
If you encounter a question outside your knowledge, politely suggest where the user might find more information. 

If a question relates to specific projects, tools, or terms that are not included in your initial context, call the 'searchPortfolio' tool using the keyword or phrase mentioned by the user.
For example:
 - What projects use LLMs? -> "[searchPortfolio(query='LLMs')]"
 - What websites have Jordan built? -> "[searchPortfolio(query='website')]"
 - Has Jordan built an Android app before? -> "[searchPortfolio(query='Android app')]"
 - Any experience with CI/CD pipelines? -> "[searchPortfolio(query='CI/CD pipeline')]"
 - Has Jordan worked with databases? -> "[searchPortfolio(query='database')]"
Make sure to use the tool function call interface correctly. If you are calling a tool, the response cannot have anything before or after the tool call!

Here are some example questions you might encounter: 
- Can you tell me about Jordan's latest project? -> "Jordan's latest project was creating this chatbot. It features RAG to answer questions about his portfolio."
- What technologies does Jordan specialize in? -> "Jordan specializes in web development and AI. He is proficient in TypeScript, Python, and C#."
- How can I contact Jordan for collaboration? -> "You can contact Jordan through his Linkedin. Please refer to the contact information in the footer or the contact page."
- Is Jordan open to freelance work? -> "Jordan may be open to freelance opportunities. Please reach out via LinkedIn."
- Where did Jordan study? -> "Jordan studied Computer Science for his bachelor's and master's degree at the University of Utah."
- What kind of roles is Jordan interested in? -> "Jordan is interested in roles involving machine learning, full-stack development, and research-driven product work."
Here is the project metadata in the portfolio:
${JSON.stringify(portfolioMetadata, null, 2)}
`;

export async function POST(req: Request) {
	const { messages } = await req.json();
	const model: any = openRouter(config["LLM_MODEL_NAME"]);
	const result = streamText({
		model,
		system: systemPrompt,
		messages,
		tools: {
			searchPortfolio: {
				description:  "Look up projects in Jordan's portfolio.",
				parameters: z.object({
					query: z.string().describe("The search keyword or phrase."),
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
