import { describe, expect, it } from "vitest";
import { parseProjectTrigger } from "../src/utils/projectTriggers";
import { projects } from "../src/data/projects";

describe("parseProjectTrigger", () => {
  it("returns all projects for [SHOW_PROJECTS]", () => {
    const parsed = parseProjectTrigger("Hello [SHOW_PROJECTS]");
    expect(parsed.hasProjectTrigger).toBe(true);
    expect(parsed.filteredProjects.length).toBe(projects.length);
    expect(parsed.cleanText).toBe("Hello");
  });

  it("filters valid project ids", () => {
    const parsed = parseProjectTrigger("Try [SHOW_PROJECTS:jaspr,cria]");
    expect(parsed.hasProjectTrigger).toBe(true);
    expect(parsed.filteredProjects.map((project) => project.id)).toEqual([
      "jaspr",
      "cria",
    ]);
    expect(parsed.cleanText).toBe("Try");
  });

  it("falls back to all projects when no id matches", () => {
    const parsed = parseProjectTrigger("Try [SHOW_PROJECTS:missing]");
    expect(parsed.hasProjectTrigger).toBe(true);
    expect(parsed.filteredProjects.length).toBe(projects.length);
  });
});
