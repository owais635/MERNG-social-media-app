import React from "react";
import ReactDOM from "react-dom";
import ApolloProvider from "./ApolloProvider";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider />
  </React.StrictMode>,
  document.getElementById("root")
);
