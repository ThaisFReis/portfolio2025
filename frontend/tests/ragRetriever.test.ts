import { describe, expect, it } from "vitest";
import { tokenize, retrieveChunks } from "../src/utils/ragRetriever";

describe("ragRetriever", () => {
  describe("tokenize", () => {
    it("lowercases and removes stopwords", () => {
      const tokens = tokenize("What is her experience with React?");
      expect(tokens).not.toContain("what");
      expect(tokens).not.toContain("is");
      expect(tokens).not.toContain("her");
      expect(tokens).toContain("experience");
      expect(tokens).toContain("react");
    });

    it("handles Portuguese stopwords", () => {
      const tokens = tokenize("Fale sobre a experiência dela com Rust");
      expect(tokens).not.toContain("fale");
      expect(tokens).not.toContain("sobre");
      expect(tokens).not.toContain("a");
      expect(tokens).toContain("experiência");
      expect(tokens).toContain("dela");
      expect(tokens).toContain("rust");
    });
  });

  describe("retrieveChunks", () => {
    it("always includes executive-summary", () => {
      const results = retrieveChunks("random obscure query xyz abc");
      const ids = results.map((r) => r.chunk.id);
      expect(ids).toContain("executive-summary");
    });

    it("retrieves relevant blockchain chunks for Rust query", () => {
      const results = retrieveChunks("Does she know Rust and Soroban?");
      const ids = results.map((r) => r.chunk.id);
      // Should retrieve blockchain skills and/or Karn-related chunks
      const hasBlockchainContent = ids.some(
        (id) =>
          id.includes("blockchain") ||
          id.includes("karn") ||
          id.includes("proof-of-life")
      );
      expect(hasBlockchainContent).toBe(true);
    });

    it("retrieves experience chunks for work history query", () => {
      const results = retrieveChunks("Where has she worked?");
      const ids = results.map((r) => r.chunk.id);
      const hasExperience = ids.some((id) => id.startsWith("exp-"));
      expect(hasExperience).toBe(true);
    });

    it("respects topK parameter", () => {
      const results = retrieveChunks("tell me everything", 3);
      expect(results.length).toBeLessThanOrEqual(3);
    });

    it("returns scored results in descending order", () => {
      const results = retrieveChunks("React TypeScript frontend");
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
      }
    });
  });
});
