import { useQuery } from "@apollo/client/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GET_CHARACTER } from "../../../graphql/queries/get-character";
import type { GetCharacterQuery } from "../../../types/__generated__/graphql";
import { LoadingSpinner } from "../../../shared/components/loading-spinner";
import { ErrorBanner } from "../../../shared/components/error-banner";
import { useUserInteractions } from "../../../hooks/use-user-interactions";
import { CommentsSection } from "./comments-section";
import { ConfirmationModal } from "../../../shared/components/confirmation-modal";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, hideCharacter } = useUserInteractions();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { loading, error, data } = useQuery<GetCharacterQuery>(GET_CHARACTER, {
    variables: { id: id! },
    skip: !id,
  });

  if (!id) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-white p-8">
        <div className="w-32 h-32 mb-4 opacity-50 bg-gray-200 rounded-full flex items-center justify-center">
          <img
            src="/src/assets/rick-and-morty.svg"
            alt="Rick and Morty"
            className="w-24 h-24 opacity-50"
          />
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

  const handleHideCharacter = () => {
    if (character.id) {
      hideCharacter(character.id);
      navigate("/characters");
    }
  };

  return (
    <div className="h-full bg-white p-8 overflow-y-auto">
      {/* Mobile Back Button */}
      <Link
        to="/characters"
        className="md:hidden mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
        aria-label="Back to character list"
      >
        <span aria-hidden="true" className="mr-2">
          ←
        </span>
        Back to list
      </Link>

      <div className="max-w-2xl mx-auto">
        {/* Header with Avatar and Name */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="relative w-32 h-32">
              {character.image && (
                <img
                  src={character.image}
                  alt={character.name || "Character"}
                  className="w-full h-full rounded-full object-cover shadow-md"
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => character.id && toggleFavorite(character.id)}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-100"
              >
                {isFavorite ? (
                  <span className="text-green-500 text-2xl">♥</span>
                ) : (
                  <span className="text-gray-300 text-2xl">♡</span>
                )}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                aria-label="Hide character"
                className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors border border-gray-100 group"
              >
                <span className="text-gray-400 group-hover:text-red-500 text-2xl">
                  🗑️
                </span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {character.name}
            </h1>
            <p className="text-lg text-gray-500">
              {character.species} • {character.gender}
            </p>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 block mb-1">Status</span>
              <span className="font-medium text-gray-900">
                {character.status}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 block mb-1">Location</span>
              <span className="font-medium text-gray-900">
                {character.location?.name}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 block mb-1">Origin</span>
              <span className="font-medium text-gray-900">
                {character.origin?.name}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 block mb-1">Type</span>
              <span className="font-medium text-gray-900">
                {character.type || "Unknown"}
              </span>
            </div>
          </div>

          {/* Episodes */}
          {character.episode && character.episode.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Episodes
              </h3>
              <div className="flex flex-wrap gap-2">
                {character.episode.slice(0, 10).map((episode) => (
                  <span
                    key={episode?.id}
                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                  >
                    {episode?.episode}
                  </span>
                ))}
                {character.episode.length > 10 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    +{character.episode.length - 10} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Comments Section */}
          {character.id && <CommentsSection characterId={character.id} />}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleHideCharacter}
        title="Hide Character"
        message="Are you sure you want to hide this character? It will be removed from your list view."
        confirmText="Hide"
        variant="danger"
      />
    </div>
  );
};
