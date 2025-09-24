# Research: Interactive AI Avatar Portfolio

This document outlines the technical decisions for the project, based on the provided requirements.

## Frontend

- **Framework**: Vite with React + TypeScript
  - **Rationale**: Vite offers a fast development server and build process. React is a robust library for building user interfaces, and TypeScript adds type safety.

- **Styling**: Tailwind CSS
  - **Rationale**: A utility-first CSS framework that allows for rapid development and easy customization to achieve the desired retro aesthetic.

- **3D Rendering**: React Three Fiber, Drei, and Postprocessing
  - **Rationale**: These libraries provide a declarative and powerful way to create 3D scenes in React, with a rich ecosystem of components and effects for post-processing, such as bloom and scanlines.

## Backend

- **Architecture**: Node.js Serverless Function
  - **Rationale**: A serverless architecture is cost-effective and scalable, perfect for a simple API endpoint. Node.js is a natural choice for a TypeScript project.

- **LLM Integration**: Google AI SDK for Gemini
  - **Rationale**: The official SDK provides a stable and easy-to-use interface for interacting with the Gemini API.
