import { describe, expect, it } from "vitest";
import { buildAugmentedPrompt } from "../src/utils/promptBuilder";

describe("promptBuilder", () => {
  it("includes behavioral system prompt", () => {
    const prompt = buildAugmentedPrompt("Tell me about Thais");
    expect(prompt).toContain("You are Nyx");
    expect(prompt).toContain("Golden Principles");
  });

  it("includes knowledge section header", () => {
    const prompt = buildAugmentedPrompt("Tell me about Thais");
    expect(prompt).toContain("[KNOWLEDGE]");
    expect(prompt).toContain("Retrieved Context");
  });

  it("includes relevant knowledge chunks", () => {
    const prompt = buildAugmentedPrompt("Does she know Rust and Soroban?");
    // Should contain blockchain-related content
    expect(prompt).toContain("Soroban");
  });

  it("includes executive summary for any query", () => {
    const prompt = buildAugmentedPrompt("random query xyz");
    expect(prompt).toContain("Executive Summary");
  });
});
