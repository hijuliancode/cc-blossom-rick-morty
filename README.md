# Rick and Morty App

A modern React application for browsing and managing Rick and Morty characters, built with performance and best practices in mind.

## 🚀 Features

- **Character Browsing**: View a paginated list of characters from the Rick and Morty universe.
- **Filtering**: Filter characters by status, species, gender, and more.
- **Character Details**: View detailed information about specific characters.
- **Favorites & Comments**: Manage your favorite characters and add personal notes.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Data Fetching**: Apollo Client (GraphQL)
- **Testing**: Vitest, React Testing Library, jest-axe (Accessibility)
- **Code Generation**: GraphQL Codegen

## 📦 Installation & Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Generate GraphQL Types** (Required for TypeScript):
    ```bash
    npm run codegen
    ```

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## 🧪 Running Tests

Run the test suite using Vitest:

```bash
npm test
```

## 🏗 Project Structure

The project follows a feature-based architecture:

- `src/features/`: Contains domain-specific modules (characters, favorites, etc.)
- `src/shared/`: Reusable components, hooks, and utilities.
- `src/graphql/`: GraphQL queries and client configuration.
- `src/context/`: Global state management.

## 📝 License

MIT
