# Quickstart

This guide explains how to set up and run the Interactive AI Avatar Portfolio project.

## Prerequisites

- Node.js
- npm, yarn, or pnpm
- Vercel CLI (for local backend development)

## Frontend Setup

1.  Navigate to the `frontend` directory.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the development server.

## Backend Setup

1.  Navigate to the `backend` directory.
2.  Create a `.env` file.
3.  Add your Gemini API key to the `.env` file:
    ```
    GEMINI_API_KEY=your-api-key
    ```
4.  If you haven't already, install the Vercel CLI: `npm install -g vercel`.
5.  Run `vercel dev` to start the serverless function locally.

## Running the Application

- Open your browser and navigate to the frontend development server URL (usually `http://localhost:5173`).
