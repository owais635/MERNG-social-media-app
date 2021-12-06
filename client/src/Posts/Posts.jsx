import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "./queries";
import { AuthContext } from "../context/auth";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

export default function Posts() {
  const authContext = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!data || !data.getPosts) {
    return <h1>Failed to get Posts</h1>;
  }

  const posts = data.getPosts;

  if (posts.length === 0) {
    return <h1>No Posts Found...</h1>;
  }

  return (
    <div style={{ margin: 8 }}>
      {authContext.user ? <PostForm /> : <h4>Please login to make a post</h4>}

      <h2 style={{ marginTop: 8 }}>Recent Posts</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          padding: "4px",
          gridGap: "16px",
        }}
      >
        {posts.map((post) => (
          <PostCard {...post} key={post.id}></PostCard>
        ))}
      </div>
    </div>
  );
}
