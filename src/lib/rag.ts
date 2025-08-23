import { InferenceClient } from "@huggingface/inference";
import { QdrantClient } from "@qdrant/js-client-rest";
import { z } from "zod";
import config from "config.json";

/**
 * Creates the searchPortfolio tool with its full definition and execution logic.
 * @param hf - The Hugging Face Inference Client instance.
 * @param qdrant - The Qdrant Client instance.
 * @returns The complete tool definition for the Vercel AI SDK.
 */
export function createSearchPortfolioTool(
  hf: InferenceClient,
  qdrant: QdrantClient
) {
  return {
    description: "Look up projects in Jordan's portfolio.",
    parameters: z.object({
      query: z.string().describe("The search keyword or phrase."),
    }),
    execute: async ({ query }: { query: string }): Promise<string[] | string> => {
      try {
        const embedding = (await hf.featureExtraction({
          model: config["EMBEDDING_MODEL_NAME"],
          inputs: query,
        })) as number[];

        const searchResults = await qdrant.search(
          config["COLLECTION_NAME"],
          {
            vector: embedding,
            limit: 5,
          }
        );

        const contexts = searchResults.map(
          (result) => (result.payload?.page_content as string) || ""
        );

        return contexts;
      } catch (error) {
        console.error(error);
        return "Error searching the portfolio. Please try again later.";
      }
    },
  };
}
