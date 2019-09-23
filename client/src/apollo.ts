import ApolloClient, { Operation } from "apollo-boost";
import { async } from "q";

const client = new ApolloClient({
  request: async (operation: Operation) => {
    operation.setContext({});
  },
  uri: "http://localhost:4000/graphql"
});

export default client;
