# AGENTS.md

This file provides context and instructions for AI agents working on the Rick and Morty App.

## 🧠 Project Overview

This is a **React 19** application using **Vite** and **TypeScript**. It consumes the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) using **Apollo Client**. The UI is styled with **Tailwind CSS v4**.

## 🛠 Tech Stack & Key Libraries

- **Framework**: React 19
- **Build**: Vite
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS v4 (No config file, uses CSS variables in `rick-morty.css`)
- **Routing**: React Router v7 (`react-router`)
- **State/Data**: Apollo Client (`@apollo/client`), Context API
- **Testing**: Vitest, React Testing Library, `user-event`, `jest-axe`
- **Codegen**: GraphQL Code Generator

## 🏗 Architecture & File Structure

The project uses a **Feature-Based Architecture**.

- `src/features/<feature-name>/`:
    - `components/`: Feature-specific UI components.
    - `hooks/`: Feature-specific logic.
    - `types/`: Feature-specific types.
- `src/shared/`: Generic, reusable code (UI kit, helpers).
- `src/graphql/`:
    - `queries/`: `.ts` files containing `gql` tags.
    - `client.ts`: Apollo Client setup.
- `src/types/__generated__/`: Auto-generated GraphQL types (Do not edit manually).

## ⚡️ Development Workflow

### Commands

- **Start Dev Server**: `npm run dev`
- **Run Tests**: `npm test` (Runs Vitest)
- **Build**: `npm run build` (Typecheck + Vite build)
- **Lint**: `npm run lint`
- **Generate Types**: `npm run codegen` (Run this after modifying GraphQL queries)

### Coding Conventions

- **React**:
    - Use Functional Components with Hooks.
    - **Strictly enforce Rules of Hooks**: No conditional hook execution.
    - Prefer `const` for definitions.
    - Use `useUserInteractions` for global user state (favorites/comments).
- **TypeScript**:
    - No `any`. Use strict typing.
    - Use generated types from `src/types/__generated__/graphql.ts`.
- **Styling**:
    - Use Tailwind utility classes.
    - Responsive design is mandatory.
- **Testing**:
    - Use `screen` and `userEvent` from `@testing-library/react`.
    - **Accessibility**: Include `axe` checks in component tests.
    - Mock Apollo Client requests using `MockedProvider` or custom mocks.

## ⚠️ Important Context

1.  **GraphQL Codegen**: If you change a query in `src/graphql/queries/`, you **MUST** run `npm run codegen` to update TypeScript definitions.
2.  **Routing**: The app uses `react-router`. Ensure `MemoryRouter` is used in tests for components relying on routing hooks.
3.  **Vercel Deployment**: The `tsconfig.app.json` has `erasableSyntaxOnly: false` to support the generated GraphQL file syntax. Do not revert this.
