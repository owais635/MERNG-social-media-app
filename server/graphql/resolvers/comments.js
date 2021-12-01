const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context, info) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: { body: "Comment body must not be empty" },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      }

      throw new UserInputError("Post not found");
    },

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");

      const commentIndex = post.comments.findIndex((c) => c.id === commentId);

      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }

      if (post.comments[commentIndex].username == username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return post;
      }

      throw new AuthenticationError("Invalid username");
    },

    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");

      const likeIndex = post.likes.findIndex(
        (like) => like.username === username
      );

      // user has a like on the post already, so remove it
      if (likeIndex !== -1) {
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        // add a like for the user
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }
      await post.save();
      return post;
    },
  },
};
