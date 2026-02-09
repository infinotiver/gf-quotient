# Copilot Instructions for Girlfriend Quotient

Welcome to the Girlfriend Quotient codebase! This document provides essential guidelines and insights to help AI coding agents contribute effectively to this project.

## Project Overview

Girlfriend Quotient is a React + Python quiz application designed to help couples create personalized relationship quizzes. The project is divided into two main components:

1. **Frontend**: Built with React, TypeScript, and Vite. It includes components, pages, and utilities for the user interface.
   - Key files:
     - `frontend/src/App.tsx`: Main application entry point.
     - `frontend/src/components/`: Contains reusable UI components.
     - `frontend/src/pages/`: Defines the main pages of the application.
     - `frontend/src/api/`: Handles API interactions.
     - `frontend/src/utils/`: Utility functions for quiz logic.
   - Build and run commands:
     - Install dependencies: `pnpm install`
     - Start development server: `pnpm dev`
     - Build for production: `pnpm build`
     - Run tests: `pnpm test`

2. **Backend**: A Python-based API built with FastAPI for managing quizzes and user data.
   - Key files:
     - `backend/app.py`: Main FastAPI application entry point.
     - `backend/routes/`: Contains API route definitions.
     - `backend/models.py`: Defines database models.
     - `backend/database.py`: Database connection and setup.
     - `backend/intimacy_level.py`: Logic for calculating intimacy levels.
   - Setup and run commands:
     - Install dependencies: `pip install -r requirements.txt`
     - Start development server: `uvicorn backend.app:app --reload`

## Project-Specific Conventions

- **Frontend**:
  - Use TypeScript for all new components and utilities.
  - Follow the ESLint rules defined in `frontend/eslint.config.js`.
  - Use the `vite` build tool for development and production builds.
  - Organize components into feature-based folders (e.g., `create-quiz` and `ui`).

- **Backend**:
  - Follow FastAPI conventions for route definitions and dependency injection.
  - Use SQLAlchemy for database interactions, as defined in `backend/database.py`.
  - Keep business logic modular and reusable (e.g., `backend/intimacy_level.py`).

## Integration Points

- The frontend communicates with the backend via API endpoints defined in `backend/routes/`.
- API client logic is encapsulated in `frontend/src/api/`.
- Shared data structures between the frontend and backend should be documented and kept consistent.

**Run both services**

- **Root dev script:** A root `package.json` has been added to start both services concurrently. From the repository root run:

```bash
pnpm install        # installs root dev deps (concurrently)
pnpm dev            # runs frontend dev server + backend uvicorn (hot reload)
```

- **Backend prerequisites:** Install Python deps before running the backend (from repo root):

```bash
python -m pip install -r backend/requirements.txt
```

- **Notes:** The `requirements.txt` currently lists `uvicorn` and `guvicorn` — `guvicorn` looks like a typo. Use `uvicorn` to run the FastAPI app:

```bash
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
```

## Testing and Debugging

- **Frontend**:
  - Use the testing setup defined in `frontend/package.json`.
  - Write tests for components and utilities in the `frontend/src` directory.

- **Backend**:
  - Use `pytest` for testing backend logic.
  - Add test cases for new API routes and business logic.

## External Dependencies

- **Frontend**:
  - React, TypeScript, Vite, and `typescript-eslint` for development.

- **Backend**:
  - FastAPI, SQLAlchemy, and Uvicorn for API and database management.

## Examples

- **Frontend**:
  - Refer to `frontend/src/components/create-quiz/QuizCard.tsx` for an example of a reusable component.
  - Check `frontend/src/api/quiz.ts` for API interaction patterns.

- **Backend**:
  - See `backend/routes.py` for adding new API routes.
  - Look at `backend/intimacy_level.py` for implementing business logic.

## Notes

- Ensure all new code is well-documented and adheres to the existing project structure.
- When in doubt, refer to the `README.md` files in the root and `frontend/` directories for additional context.

Happy coding!
