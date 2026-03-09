import { projects } from "../data/projects";
import type { ProjectData } from "../types/chat";

export interface ParsedProjectTrigger {
  cleanText: string;
  hasProjectTrigger: boolean;
  filteredProjects: ProjectData[];
}

export function parseProjectTrigger(text: string): ParsedProjectTrigger {
  const projectTriggerRegex = /\[SHOW_PROJECTS(?::([a-z0-9,-]+))?\]/i;
  const projectMatch = text.match(projectTriggerRegex);
  const hasProjectTrigger = projectMatch !== null;

  let filteredProjects = projects;
  if (hasProjectTrigger && projectMatch[1]) {
    const requestedIds = projectMatch[1].split(",").map((id) => id.trim());
    filteredProjects = projects.filter((project) => requestedIds.includes(project.id));
    if (filteredProjects.length === 0) {
      filteredProjects = projects;
    }
  }

  const cleanText = text.replace(projectTriggerRegex, "").trim();

  return {
    cleanText,
    hasProjectTrigger,
    filteredProjects,
  };
}
