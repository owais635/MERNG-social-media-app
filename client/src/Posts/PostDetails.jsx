import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./components/LikeButton";

export default function PostDetails(props) {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
    onError(err) {
      console.log(err);
    },
  });

  if (!data || !data.getPost) return <h2>Loading...</h2>;

  const {
    body,
    createdAt,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  } = data.getPost;

  return (
    <div style={{ margin: "16px auto", maxWidth: 500 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{username}</h2>
        <div>
          <p style={{ fontSize: 14, marginBottom: 8 }}>
            {new Date(createdAt).toLocaleString()}
          </p>
          {user && user.username === username && <button>Delete Post</button>}
        </div>
      </div>

      <p style={{ margin: "24px 0px", fontSize: 28 }}>{body}</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <LikeButton
            user={user}
            id={postId}
            likes={likes}
            likeCount={likeCount}
          />
        </div>
      </div>
    </div>
  );
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
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
