import { createBrowserRouter, Navigate } from "react-router";
import { Suspense, lazy } from "react";
import { PageLoader } from "@/shared/components/page-loader";

const CharactersLayout = lazy(() =>
  import("@/features/characters/layouts/characters-layout").then((module) => ({
    default: module.CharactersLayout,
  })),
);
const CharacterDetail = lazy(() =>
  import("@/features/characters/components/character-detail").then(
    (module) => ({
      default: module.CharacterDetail,
    }),
  ),
);
const NotFoundPage = lazy(() =>
  import("@/shared/components/not-found-page").then((module) => ({
    default: module.NotFoundPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/characters" replace />,
  },
  {
    path: "/characters",
    element: (
      <Suspense fallback={<PageLoader />}>
        <CharactersLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <CharacterDetail />
          </Suspense>
        ),
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CharacterDetail />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
