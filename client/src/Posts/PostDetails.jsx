import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./components/LikeButton";
import DeleteButton from "./components/DeleteButton";
import Comment from "./components/Comment";
import CommentForm from "./CommentForm";

export default function PostDetails(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
    onError(err) {
      console.log(err);
    },
  });

  const onDelete = () => navigate("/"); // navigate to home

  if (!data || !data.getPost)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

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
    <div style={{ margin: "16px auto", maxWidth: 600, padding: "0px 4px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>{username}</h2>
          <p style={{ fontSize: 14, marginBottom: 8 }}>
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        {user && user.username === username && (
          <DeleteButton postId={postId} onDelete={onDelete} />
        )}
      </div>

      <p style={{ margin: "24px 0px", fontSize: 28 }}>{body}</p>

      <LikeButton user={user} id={postId} likes={likes} likeCount={likeCount} />

      <div style={{ margin: "16px 0px" }}>
        <p>
          {commentCount}&nbsp;{commentCount === 1 ? "Comment" : "Comments"}
        </p>

        <CommentForm postId={postId} />

        {comments.map((comment) => (
          <Comment key={comment.id} postId={postId} {...comment} />
        ))}
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
