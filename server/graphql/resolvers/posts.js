const Post = require("../../models/Post");

module.exports = {
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
