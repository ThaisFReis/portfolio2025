import { retrieveChunks } from "./ragRetriever";
import SYSTEM_PROMPT from "../data/systemPrompt";
/**
 * Build the augmented system prompt by retrieving relevant knowledge chunks
 * and injecting them into the lean behavioral prompt.
 *
 * @param query - The user's current question/message
 * @param topK - Number of knowledge chunks to retrieve (default: 5)
 * @returns Complete system prompt with behavioral rules + relevant knowledge
 */
export function buildAugmentedPrompt(query, topK = 5) {
    const results = retrieveChunks(query, topK);
    // Format retrieved chunks into a knowledge section
    const knowledgeSection = results
        .map((r) => `### ${r.chunk.title}\n${r.chunk.content}`)
        .join("\n\n");
    // Compose: behavioral prompt + knowledge injection
    return `${SYSTEM_PROMPT}

## [KNOWLEDGE] — Retrieved Context

The following information was retrieved based on the user's query. Use ONLY this information to answer. If the answer is not covered here, say you can share details about Thais's skills, projects, or experience and ask them to be more specific.

${knowledgeSection}`;
}
