import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { memo } from "react";
import { ButtonFavorite } from "@/shared/components/button-favorite";
import { useUserInteractions } from "@/hooks/use-user-interactions";
import type { Character } from "@/types/__generated__/graphql";

type CharacterListItemProps = {
  character: Pick<Character, "id" | "name" | "species" | "image">;
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const CharacterListItem = memo(
  ({ character }: CharacterListItemProps) => {
    const { favorites, toggleFavorite } = useUserInteractions();
    const isFavorite = character.id ? favorites.includes(character.id) : false;

    if (!character.id) return null;

    return (
      <motion.div
        layout
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <NavLink to={`/characters/${character.id}`} className="block">
          {({ isActive }) => (
            <motion.div
              whileHover={{ scale: 1.05, zIndex: 1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? "bg-purple-100 " : "bg-white hover:bg-gray-50"
              }`}
            >
              {character.image && (
                <img
                  src={character.image}
                  alt={character.name || "Character"}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {character.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {character.species}
                </p>
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
            </motion.div>
          )}
        </NavLink>
      </motion.div>
    );
  },
);

CharacterListItem.displayName = "CharacterListItem";
