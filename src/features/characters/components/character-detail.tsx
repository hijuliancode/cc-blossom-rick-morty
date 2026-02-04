import { useQuery } from "@apollo/client/react";
import { useParams, Link } from "react-router-dom";
import { GET_CHARACTER } from "../../../graphql/queries/get-character";
import type { GetCharacterQuery } from "../../../types/__generated__/graphql";
import { LoadingSpinner } from "../../../shared/components/loading-spinner";
import { ErrorBanner } from "../../../shared/components/error-banner";
import { useUserInteractions } from "../../../hooks/use-user-interactions";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { favorites, toggleFavorite } = useUserInteractions();

  const { loading, error, data } = useQuery<GetCharacterQuery>(GET_CHARACTER, {
    variables: { id: id! },
    skip: !id,
  });

  if (!id) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-white p-8">
        <div className="w-32 h-32 mb-4 opacity-50 bg-gray-200 rounded-full flex items-center justify-center">
          {/* Placeholder for "Select a character" */}
          <span className="text-4xl">👽</span>
        </div>
        <p className="text-xl font-medium">Select a character</p>
        <p className="text-sm">
          Choose a character from the list to see details
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-white">
        <ErrorBanner
          title="Error loading character"
          description={error.message}
        />
      </div>
    );
  }

  const character = data?.character;

  if (!character) return null;

  const isFavorite = character.id ? favorites.includes(character.id) : false;

  return (
    <div className="h-full bg-white p-8 overflow-y-auto">
      {/* Mobile Back Button */}
      <Link
        to="/characters"
        className="md:hidden mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        ← Back to list
      </Link>

      <div className="max-w-2xl mx-auto">
        {/* Header with Avatar and Name */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="relative w-32 h-32">
            {character.image && (
              <img
                src={character.image}
                alt={character.name || "Character"}
                className="w-full h-full rounded-full object-cover shadow-md"
              />
            )}
            <button
              onClick={() => character.id && toggleFavorite(character.id)}
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              {isFavorite ? (
                <span className="text-green-500 text-2xl">♥</span>
              ) : (
                <span className="text-gray-300 text-2xl">♡</span>
              )}
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {character.name}
            </h1>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <p className="text-sm font-semibold text-gray-500 mb-1">Specie</p>
            <p className="text-lg text-gray-900">{character.species}</p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm font-semibold text-gray-500 mb-1">Status</p>
            <p className="text-lg text-gray-900">{character.status}</p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm font-semibold text-gray-500 mb-1">
              Occupation
            </p>
            <p className="text-lg text-gray-900">
              {character.type || "Unknown"}
            </p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm font-semibold text-gray-500 mb-1">Gender</p>
            <p className="text-lg text-gray-900">{character.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
