import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../../graphql/queries/get-characters";
import type { GetCharactersQuery } from "../../types/__generated__/graphql";
import { ErrorBanner } from "./error-banner";
import { LoadingSpinner } from "./loading-spinner";

export const DisplayCharacters = () => {
  const { loading, error, data } = useQuery<GetCharactersQuery>(GET_CHARACTERS);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="h-screen flex items-center justify-center px-6">
        <ErrorBanner
          title="Uh oh! Something went wrong"
          description={error.message}
        />
      </div>
    );
  if (!data?.characters?.results) return null;

  return data.characters.results.map((character) => {
    if (!character) return null;
    return (
      <div key={character.id}>
        <p>{character.name}</p>
        <p>{character.species}</p>
        <p>{character.status}</p>
        <p>{character.gender}</p>
      </div>
    );
  });
};
