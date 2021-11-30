const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { SECRET_KEY } = process.env;

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error("Authorization header must be provided");
  }

  // Bearer ....
  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  try {
    const user = jwt.verify(token, SECRET_KEY);
    return user;
  } catch (e) {
    throw new AuthenticationError("Invalid/Expired token");
  }
};
