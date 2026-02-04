import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { RICK_AND_MORTY_API_URL } from "../shared/constants/urls";

export const client = new ApolloClient({
  link: new HttpLink({ uri: RICK_AND_MORTY_API_URL }),
  cache: new InMemoryCache()
});