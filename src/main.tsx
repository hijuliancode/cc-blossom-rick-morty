import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client.ts";
import { UserInteractionsProvider } from "./context/user-interactions.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserInteractionsProvider>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </UserInteractionsProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
);
