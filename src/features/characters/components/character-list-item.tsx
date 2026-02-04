import { NavLink } from "react-router-dom";
import { useUserInteractions } from "../../../hooks/use-user-interactions";
import type { Character } from "../../../types/__generated__/graphql";

type CharacterListItemProps = {
  character: Pick<Character, "id" | "name" | "species" | "image">;
};

export const CharacterListItem = ({ character }: CharacterListItemProps) => {
  const { favorites, toggleFavorite } = useUserInteractions();
  const isFavorite = character.id ? favorites.includes(character.id) : false;

  if (!character.id) return null;

  return (
    <NavLink
      to={`/characters/${character.id}`}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-colors border-l-4 ${
          isActive
            ? "bg-purple-100 border-purple-500"
            : "bg-white hover:bg-gray-50 border-transparent"
        }`
      }
    >
      {character.image && (
        <img
          src={character.image}
          alt={character.name || "Character"}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{character.name}</p>
        <p className="text-sm text-gray-500 truncate">{character.species}</p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation when clicking favorite
          if (character.id) toggleFavorite(character.id);
        }}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        {isFavorite ? (
          <span className="text-green-500 text-xl">♥</span>
        ) : (
          <span className="text-gray-300 text-xl">♡</span>
        )}
      </button>
    </NavLink>
  );
};
