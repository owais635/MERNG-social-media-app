const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        console.error(`Failed to get Posts: ${e}`);
      }
    },

    async getPost(_, { postId }) {
      const post = await Post.findById(postId);
      if (post) return post;

      throw new Error("Post not found.");
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      // by now if user wasn't authenticated checkAuth would've thrown error

      if (body.trim() === "") {
        throw new UserInputError("Empty body", {
          errors: { body: "Body must not be empty" },
        });
      }

      const newPost = new Post({
        username: user.username,
        body,
        createdAt: new Date().toISOString(),
        // comments: [{ body: String, username: String, createdAt: String }],
        // likes: [{ username: String, createdAt: String }],
        user: user.id,
      });

      const post = await newPost.save();

      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      let post;

      try {
        post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");
      } catch (r) {
        throw new Error("Post not found");
      }

      if (post.username == user.username) {
        await post.delete();
        return "success";
      } else {
        throw new AuthenticationError("Invalid username");
      }
    },
  },
};
