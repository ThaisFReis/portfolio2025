<!--
Sync Impact Report:
- Version change: none → 1.0.0
- List of modified principles: 5 principles added.
- Added sections: "Core Principles", "Governance"
- Removed sections: "[SECTION_2_NAME]", "[SECTION_3_NAME]"
- Templates requiring updates:
  - ✅ /home/thaisfreis/Documentos/Workspace/meu-avatar-ai/.specify/templates/plan-template.md
- Follow-up TODOs:
  - TODO(RATIFICATION_DATE): Set initial adoption date.
-->
# meu-avatar-ai Constitution

## Core Principles

### I. Immersive User Experience
The primary goal is to create a captivating retro-futuristic cyberpunk experience. All UI/UX decisions must serve this aesthetic, including CRT effects, glowing elements, and pixelated fonts.

### II. High Performance 3D
The 3D avatar must render smoothly on modern web browsers. Prioritize performance by keeping the 3D scene optimized and using efficient libraries.

### III. Modular & Scalable Code
The codebase, especially in the frontend, must be written in TypeScript with clean, reusable React components. The backend must be a stateless serverless function.

### IV. Secure API Handling
The Google Gemini API key MUST be handled securely using environment variables on the backend. It should never be exposed on the frontend.

### V. Clear Project Structure
Maintain a strict separation between the `frontend` and `backend` directories within the monorepo.

## Governance

Amendments to this constitution require a pull request and approval from the project maintainers. All changes must be documented in the Sync Impact Report.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Set initial adoption date. | **Last Amended**: 2025-09-22
