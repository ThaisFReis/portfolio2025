# Tasks: Interactive AI Avatar Portfolio

**Input**: Design documents from `/home/thaisfreis/Documentos/Workspace/meu-avatar-ai/specs/001-build-an-interactive/`

## Phase 3.1: Setup
- [X] T001 [P] Initialize a new Vite project with the React + TypeScript template in the `frontend` directory.
- [X] T002 [P] Initialize a new Node.js project with TypeScript in the `backend` directory.
- [X] T003 [P] Install frontend dependencies: `tailwindcss`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`.
- [X] T004 [P] Install backend dependencies: `@google/generative-ai`, `typescript`, `ts-node`.
- [X] T005 [P] Configure Tailwind CSS in the `frontend` project.
- [X] T006 [P] Configure TypeScript for the `backend` project.

## Phase 3.2: Backend Development
- [X] T007 Create the serverless function file in `backend/src/api/chat.ts`.
- [X] T008 Implement the POST endpoint `/api/chat` that receives a message in the request body.
- [X] T009 Add logic to load the `GEMINI_API_KEY` from environment variables.
- [X] T010 Implement the prompt engineering logic to construct a prompt for the Gemini API.
- [X] T011 Integrate the Google AI SDK to send the prompt to the Gemini API and get a response.
- [X] T012 Stream the response back to the client.

## Phase 3.3: Frontend Development (3D Scene)
- [X] T013 Create a new React component for the 3D scene in `frontend/src/components/Scene.tsx`.
- [X] T014 Set up the basic React Three Fiber scene with a camera and lights.
- [X] T015 Load the 3D avatar from `/public/thais1.glb` using `@react-three/drei`'s `useGLTF` hook.
- [X] T016 Apply a holographic wireframe material to the avatar.
- [X] T017 Implement the CRT post-processing effect stack using `@react-three/postprocessing`.
- [X] T018 Implement the eye-tracking logic inside a `useFrame` hook to make the avatar's eyes follow the mouse cursor.

## Phase 3.4: Frontend Development (Chat UI)
- [X] T019 Create a new React component for the chat interface in `frontend/src/components/Chat.tsx`.
- [X] T020 Style the chat interface to look like a retro computer terminal using Tailwind CSS.
- [X] T021 Implement the chat input box and send button.
- [X] T022 Manage the chat history using React state.
- [X] T023 Implement the typewriter effect for displaying AI responses.
- [X] T024 Use the `fetch` API to send user messages to the backend API and receive the response.

## Phase 3.5: Integration & Polish
- [X] T025 Integrate the `Scene.tsx` and `Chat.tsx` components into the main `App.tsx` file.
- [X] T026 Ensure the frontend and backend are communicating correctly.
- [X] T027 [P] Write unit tests for the backend API.
- [X] T028 [P] Write component tests for the frontend components.
- [X] T029 [P] Update the `README.md` with instructions on how to run the project.
- [X] T030 [P] Perform a final review of the UI and functionality to ensure it meets the requirements.

## Dependencies
- Backend development (T007-T012) can happen in parallel with frontend development (T013-T024).
- Integration & Polish (T025-T030) should happen after the frontend and backend are mostly complete.

## Parallel Example
```
# Launch backend and frontend setup tasks together:
Task: "[P] Initialize a new Vite project with the React + TypeScript template in the frontend directory."
Task: "[P] Initialize a new Node.js project with TypeScript in the backend directory."
```
