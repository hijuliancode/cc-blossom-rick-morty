import { gql } from "@apollo/client";

export const GET_CHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      species
      status
      gender
      image
      type
    }
  }
`;
