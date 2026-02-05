import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query getCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        name
        species
        status
        gender
        image
      }
    }
  }
`;
