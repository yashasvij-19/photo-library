import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://napak.stepzen.net/api/getting-started/__graphql",
  headers: {
    Authorization:
      "apikey napak::stepzen.io+1000::8a9dfa8e1f6e6a0139a70e2b40652ca8b6e5a34408af696930057a210a4f9fa1",
  },
  cache: new InMemoryCache(),
});

export default client;
