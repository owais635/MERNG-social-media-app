require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const Post = require("./models/Post");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        console.error(`Failed to get Posts: ${e}`);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
