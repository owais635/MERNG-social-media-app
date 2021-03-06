import React from "react";
import App from "./App";
import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

// when the user logs in, use the token
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Provider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Provider;
