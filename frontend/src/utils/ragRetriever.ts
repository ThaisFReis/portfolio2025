import { knowledgeChunks, type KnowledgeChunk } from "../data/knowledgeChunks";

// ==========================================
// Stopwords (Portuguese + English)
// ==========================================
const STOPWORDS = new Set([
  // English
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "can", "shall", "to", "of", "in", "for",
  "on", "with", "at", "by", "from", "as", "into", "about", "it", "its",
  "this", "that", "these", "those", "i", "you", "he", "she", "we", "they",
  "me", "him", "her", "us", "them", "my", "your", "his", "our", "their",
  "what", "which", "who", "whom", "how", "when", "where", "why",
  "not", "no", "nor", "but", "or", "and", "if", "then", "so",
  "very", "just", "also", "more", "most", "some", "any", "all",
  "up", "out", "than", "too", "each", "other",
  "tell", "show", "know", "does", "much", "many",
  // Portuguese
  "o", "a", "os", "as", "um", "uma", "uns", "umas",
  "de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas",
  "por", "para", "com", "sem", "sob", "sobre",
  "e", "ou", "mas", "se", "que", "como", "qual", "quais",
  "eu", "tu", "ele", "ela", "nós", "eles", "elas", "você", "vocês",
  "me", "te", "lhe", "nos", "vos", "lhes",
  "meu", "minha", "seu", "sua", "nosso", "nossa",
  "é", "são", "foi", "era", "tem", "está", "ser", "ter", "estar",
  "não", "sim", "muito", "mais", "também", "já",
  "fale", "fala", "conte", "diga", "mostre", "sabe",
]);

// ==========================================
// Tokenizer
// ==========================================
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-záàâãéèêíïóôõöúüçñ0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// ==========================================
// BM25 Engine
// ==========================================

// BM25 parameters
const K1 = 1.5; // Term frequency saturation
const B = 0.75; // Document length normalization

interface BM25Index {
  /** Inverse Document Frequency for each term */
  idf: Map<string, number>;
  /** Tokenized documents (tags + content) */
  docs: string[][];
  /** Average document length */
  avgDl: number;
}

let cachedIndex: BM25Index | null = null;

/**
 * Build or retrieve the cached BM25 index for all knowledge chunks.
 * Index is built once and reused across queries.
 */
function getIndex(): BM25Index {
  if (cachedIndex) return cachedIndex;

  // Tokenize each chunk: tags (boosted by repeating) + title + content
  const docs = knowledgeChunks.map((chunk) => {
    const tagTokens = chunk.tags.flatMap((t) => tokenize(t));
    // Repeat tags 3x to boost their weight in BM25 scoring
    const boostedTags = [...tagTokens, ...tagTokens, ...tagTokens];
    const titleTokens = tokenize(chunk.title);
    const contentTokens = tokenize(chunk.content);
    return [...boostedTags, ...titleTokens, ...contentTokens];
  });

  const totalDocs = docs.length;
  const avgDl = docs.reduce((sum, d) => sum + d.length, 0) / totalDocs;

  // Compute IDF: log((N - df + 0.5) / (df + 0.5) + 1)
  const df = new Map<string, number>();
  for (const doc of docs) {
    const seen = new Set(doc);
    for (const term of seen) {
      df.set(term, (df.get(term) || 0) + 1);
    }
  }

  const idf = new Map<string, number>();
  for (const [term, freq] of df) {
    idf.set(term, Math.log((totalDocs - freq + 0.5) / (freq + 0.5) + 1));
  }

  cachedIndex = { idf, docs, avgDl };
  return cachedIndex;
}

/**
 * Score a single document against a query using BM25.
 */
function scoreBM25(queryTokens: string[], docTokens: string[], index: BM25Index): number {
  const dl = docTokens.length;

  // Build term frequency map for this document
  const tf = new Map<string, number>();
  for (const t of docTokens) {
    tf.set(t, (tf.get(t) || 0) + 1);
  }

  let score = 0;
  for (const qt of queryTokens) {
    const termFreq = tf.get(qt) || 0;
    if (termFreq === 0) continue;

    const idfVal = index.idf.get(qt) || 0;
    const numerator = termFreq * (K1 + 1);
    const denominator = termFreq + K1 * (1 - B + B * (dl / index.avgDl));
    score += idfVal * (numerator / denominator);
  }

  return score;
}

// ==========================================
// Public API
// ==========================================

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

/**
 * Retrieve the top-K most relevant knowledge chunks for a given query.
 *
 * - Always includes the "executive-summary" chunk for baseline context.
 * - Uses BM25 scoring with tag boosting.
 *
 * @param query - User's question/prompt
 * @param topK - Number of chunks to retrieve (default: 5)
 * @returns Array of chunks sorted by relevance score (descending)
 */
export function retrieveChunks(query: string, topK: number = 5): RetrievalResult[] {
  const index = getIndex();
  const queryTokens = tokenize(query);

  // Score all chunks
  const scored: RetrievalResult[] = knowledgeChunks.map((chunk, i) => ({
    chunk,
    score: scoreBM25(queryTokens, index.docs[i], index),
  }));

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top K
  const topChunks = scored.slice(0, topK);

  // Ensure executive-summary is always included
  const hasExecutiveSummary = topChunks.some((r) => r.chunk.id === "executive-summary");
  if (!hasExecutiveSummary) {
    const execSummary = scored.find((r) => r.chunk.id === "executive-summary");
    if (execSummary) {
      topChunks.pop(); // Remove lowest-scored chunk
      topChunks.push(execSummary);
    }
  }

  return topChunks;
}
