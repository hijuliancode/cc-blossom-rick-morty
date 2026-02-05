import { createBrowserRouter, Navigate } from "react-router";
import { CharactersLayout } from "@/features/characters/layouts/characters-layout";
import { CharacterDetail } from "@/features/characters/components/character-detail";
import { NotFoundPage } from "@/shared/components/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/characters" replace />,
  },
  {
    path: "/characters",
    element: <CharactersLayout />,
    children: [
      {
        index: true,
        element: <CharacterDetail />,
      },
      {
        path: ":id",
        element: <CharacterDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
