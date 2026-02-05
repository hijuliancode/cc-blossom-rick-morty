import { NavLink } from "react-router";
import { ButtonFavorite } from "@/shared/components/button-favorite";
import { useUserInteractions } from "@/hooks/use-user-interactions";
import type { Character } from "@/types/__generated__/graphql";

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
        `flex items-center gap-3 p-3 rounded-lg transition-colors ${
          isActive ? "bg-purple-100 " : "bg-white hover:bg-gray-50"
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
      <ButtonFavorite
        isFavorite={isFavorite}
        onClick={(e) => {
          e.preventDefault();
          if (character.id) toggleFavorite(character.id);
        }}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        iconClassName="w-5 h-5"
      />
    </NavLink>
  );
};
