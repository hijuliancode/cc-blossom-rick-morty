import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client.ts";
import { UserInteractionsProvider } from "./context/user-interactions-provider.tsx";
import { CharactersLayout } from "./features/characters/layouts/characters-layout.tsx";
import { CharacterDetail } from "./features/characters/components/character-detail.tsx";
import "./rick-morty.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserInteractionsProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/characters" replace />} />
            <Route path="/characters" element={<CharactersLayout />}>
              <Route index element={<CharacterDetail />} />
              <Route path=":id" element={<CharacterDetail />} />
            </Route>
          </Routes>
        </UserInteractionsProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
);
