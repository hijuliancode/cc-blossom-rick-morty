import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
);
