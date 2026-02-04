import { useUserInteractions } from "../../../context/user-interactions";
import type { Character } from "../../../types/__generated__/graphql";

type CharacterCardProps = {
  character: Pick<
    Character,
    "id" | "name" | "species" | "status" | "gender" | "image"
  >;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { favorites, toggleFavorite, hideCharacter } = useUserInteractions();
  const isFavorite = character.id ? favorites.includes(character.id) : false;

  if (!character.id) return null;

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white relative group">
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (character.id) toggleFavorite(character.id);
          }}
          className="p-1 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (character.id) hideCharacter(character.id);
          }}
          className="p-1 rounded-full bg-white/80 hover:bg-red-50 hover:text-red-500 shadow-sm transition-colors text-gray-400"
        >
          ✕
        </button>
      </div>
      {character.image && (
        <img
          src={character.image}
          alt={character.name || "Character"}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <p className="font-bold text-lg mb-1">{character.name}</p>
      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Species:</span> {character.species}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {character.status}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {character.gender}
        </p>
      </div>
    </div>
  );
};
