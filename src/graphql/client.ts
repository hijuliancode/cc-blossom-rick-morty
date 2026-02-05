import { HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { RICK_AND_MORTY_API_URL } from "@/shared/constants/urls";

interface GraphQLError {
  message: string;
  locations?: ReadonlyArray<{ line: number; column: number }>;
  path?: ReadonlyArray<string | number>;
}

interface ErrorResponse {
  graphQLErrors?: ReadonlyArray<GraphQLError>;
  networkError?: Error | null;
}

const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: RICK_AND_MORTY_API_URL });

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ["filter"],
            merge(existing, incoming) {
              if (!existing) return incoming;
              // Simple merge for results if implementing infinite scroll later
              // For now, adhering to default behavior (replace) is safer unless paginating
              return incoming;
            },
          },
        },
      },
    },
  }),
});