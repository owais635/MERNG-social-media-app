import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import PostCard from "./PostCard";

export default function Posts() {
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
      <h2>Recent Posts</h2>
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

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        createdAt
        body
        username
      }
    }
  }
`;
