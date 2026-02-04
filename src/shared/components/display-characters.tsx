import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../../graphql/queries/get-characters";
import { ErrorBanner } from "./error-banner";

export type Character = {
  id: string;
  name: string;
  species: string;
  status: string;
  gender: string;
};

export const DisplayCharacters = () => {
  const { loading, error, data } = useQuery<{
    characters: { results: Character[] };
  }>(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div className="h-screen flex items-center justify-center px-6">
        <ErrorBanner
          title="Uh oh! Something went wrong"
          description={error.message}
        />
      </div>
    );
  if (!data) return null;

  return data.characters.results.map((character: Character) => (
    <div key={character.id}>
      <p>{character.name}</p>
      <p>{character.species}</p>
      <p>{character.status}</p>
      <p>{character.gender}</p>
    </div>
  ));
};
