import { useMemo } from "react";
import type { Character, GetCharactersQuery } from "@/types/__generated__/graphql";

type SortOrder = "asc" | "desc" | string | null;

interface UseCharacterProcessingProps {
  data: GetCharactersQuery | undefined;
  deletedCharacters: string[];
  favorites: string[];
  sortOrder: SortOrder;
}

export const useCharacterProcessing = ({
  data,
  deletedCharacters,
  favorites,
  sortOrder,
}: UseCharacterProcessingProps) => {
  const filteredCharacters = useMemo(() => {
    const chars =
      data?.characters?.results?.filter(
        (char): char is Character =>
          !!char && !deletedCharacters.includes(char.id || ""),
      ) || [];

    if (sortOrder) {
      // Create a shallow copy to sort immutably
      const sortedChars = [...chars];
      sortedChars.sort((a, b) => {
        if (sortOrder === "asc")
          return (a.name || "").localeCompare(b.name || "");
        if (sortOrder === "desc")
          return (b.name || "").localeCompare(a.name || "");
        return 0;
      });
      return sortedChars;
    }

    return chars;
  }, [data, deletedCharacters, sortOrder]);

  const { starredCharacters, otherCharacters } = useMemo(() => {
    const starred: Character[] = [];
    const others: Character[] = [];

    // filteredCharacters is already sorted if sortOrder is present
    filteredCharacters.forEach((char) => {
      if (!char?.id) return;
      if (favorites.includes(char.id)) {
        starred.push(char);
      } else {
        others.push(char);
      }
    });

    return { starredCharacters: starred, otherCharacters: others };
  }, [filteredCharacters, favorites]);

  return { filteredCharacters, starredCharacters, otherCharacters };
};
