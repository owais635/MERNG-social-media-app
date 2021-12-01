const postResolvers = require("./posts");
const commentsResolvers = require("./comments");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
