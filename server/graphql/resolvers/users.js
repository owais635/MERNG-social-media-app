const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateRegisterInput } = require("../../utils/validators");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(parent, args, context, info) {
      let { username, password, confirmPassword, email } = args.registerInput;

      // TODO Validate User Data

      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // make user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: { username: "This user name is taken" },
        });
      }

      // Hash password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jsonwebtoken.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { ...res._doc, id: res._id, token };
    },
  },
};
