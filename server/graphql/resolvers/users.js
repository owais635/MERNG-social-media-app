const User = require("../../models/User");

module.exports = {
  Mutation: {
    register(parent, args, context, info) {
      // TODO Validate User Data
      // TODO make user doesn't already exist
      // TODO Hash password
    },
  },
};
