import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "react-router-dom";
import { GET_CHARACTERS } from "../../graphql/queries/get-characters";
import type { GetCharactersQuery } from "../../types/__generated__/graphql";
import { ErrorBanner } from "./error-banner";
import { LoadingSpinner } from "./loading-spinner";
import { CharacterCard } from "../../features/characters/components/character-card";
import { FilterBar } from "../../features/characters/components/filter-bar";
import { useUserInteractions } from "../../context/user-interactions";

export const DisplayCharacters = () => {
  const [searchParams] = useSearchParams();
  const { hiddenCharacters, favorites } = useUserInteractions();

  // Extract query variables from URL params
  const name = searchParams.get("name") || undefined;
  const status = searchParams.get("status") || undefined;
  const species = searchParams.get("species") || undefined;
  const gender = searchParams.get("gender") || undefined;
  const filterType = searchParams.get("filter") || "all";
  const sortOrder = searchParams.get("sort");

  const { loading, error, data } = useQuery<GetCharactersQuery>(
    GET_CHARACTERS,
    {
      variables: {
        filter: {
          name,
          status,
          species,
          gender,
        },
      },
    },
  );

  let content;

  if (loading) {
    content = (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex items-center justify-center py-20 px-6">
        <ErrorBanner
          title="Uh oh! Something went wrong"
          description={error.message}
        />
      </div>
    );
  } else {
    let characters = data?.characters?.results?.filter(
      (char) => char && !hiddenCharacters.includes(char.id || ""),
    );

    if (characters) {
      // Client-side filtering for Starred/Others
      if (filterType === "starred") {
        characters = characters.filter((char) =>
          char?.id ? favorites.includes(char.id) : false,
        );
      } else if (filterType === "others") {
        characters = characters.filter((char) =>
          char?.id ? !favorites.includes(char.id) : true,
        );
      }

      // Client-side sorting
      if (sortOrder === "asc") {
        characters = [...characters].sort((a, b) =>
          (a?.name || "").localeCompare(b?.name || ""),
        );
      } else if (sortOrder === "desc") {
        characters = [...characters].sort((a, b) =>
          (b?.name || "").localeCompare(a?.name || ""),
        );
      }

      if (characters.length === 0) {
        content = (
          <p className="text-center text-gray-500 mt-10">
            No characters found matching your criteria.
          </p>
        );
      } else {
        content = (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {characters.map((character) => {
              if (!character) return null;
              return <CharacterCard key={character.id} character={character} />;
            })}
          </div>
        );
      }
    } else {
      content = null;
    }
  }

  return (
    <div className="container mx-auto p-4">
      <FilterBar />
      {content}
    </div>
  );
};
