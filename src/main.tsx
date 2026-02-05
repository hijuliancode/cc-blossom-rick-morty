import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/client";
import { UserInteractionsProvider } from "@/context/user-interactions-provider";
import { router } from "@/router";

// Nunito weights
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@/rick-morty.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserInteractionsProvider>
        <RouterProvider router={router} />
      </UserInteractionsProvider>
    </ApolloProvider>
  </StrictMode>,
);
