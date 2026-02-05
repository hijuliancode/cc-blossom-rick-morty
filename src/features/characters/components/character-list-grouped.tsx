import { CharacterListItem } from "./character-list-item";
import type { Character } from "@/types/__generated__/graphql";

interface CharacterListGroupedProps {
  starredCharacters: Character[];
  otherCharacters: Character[];
}

export const CharacterListGrouped = ({
  starredCharacters,
  otherCharacters,
}: CharacterListGroupedProps) => {
  if (starredCharacters.length === 0 && otherCharacters.length === 0) {
    return null; // Or empty state handled by parent
  }

  return (
    <div className="space-y-6">
      {starredCharacters.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-6">
            Starred Characters ({starredCharacters.length})
          </h3>
          {starredCharacters.map((char) =>
            char ? (
              <div key={char.id}>
                <div className="h-px bg-gray-200 mx-4 my-1" />
                <div className="px-2">
                  <CharacterListItem character={char} />
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}

      {otherCharacters.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-6">
            Characters ({otherCharacters.length})
          </h3>
          {otherCharacters.map((char) =>
            char ? (
              <div key={char.id}>
                <div className="h-px bg-gray-200 mx-4 my-1" />
                <div className="px-2">
                  <CharacterListItem character={char} />
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
};
