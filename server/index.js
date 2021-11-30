require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDef");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // to get headers
});

mongoose
  .connect(process.env.MONDO_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to MongoDB successful.");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server Running ${res.url}`);
  });
