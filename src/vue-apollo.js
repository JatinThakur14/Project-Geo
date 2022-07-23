import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  concat,
  ApolloLink,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

function getHeaders() {
  const header = {
    "x-hasura-admin-secret":
      "NVs51OIy1kNqQiVO6zZK7ye3VGknsNWiPBK9tn4Aqb3uwgvn3uOXXDuJNG8kJ6m9",
    "x-hasura-role": "user",
    "x-hasura-user-name": localStorage.getItem("loginToken"),
  };
  return header;
}
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: getHeaders(),
  });
  return forward(operation);
});
const httpLink = createHttpLink({
  uri: "https://tidy-seasnail-24.hasura.app/v1/graphql",
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
