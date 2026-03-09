import { describe, expect, it, vi } from "vitest";
import { getFallbackResponse } from "../src/utils/fallbackResponses";

describe("getFallbackResponse", () => {
  it("returns keyword-specific fallback when keyword is present", () => {
    const response = getFallbackResponse("Tell me about react projects");
    expect(response.toLowerCase()).toContain("react");
  });

  it("returns one of default responses when no keyword matches", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const response = getFallbackResponse("no known keyword here");
    expect(response.length).toBeGreaterThan(0);
    vi.restoreAllMocks();
  });
});
