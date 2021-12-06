import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../queries";

const DELETE_POST_MESSAGE =
  "Are you sure you want to delete this Post permanently?";

const DELETE_COMMENT_MESSAGE =
  "Are you sure you want to delete this Comment permanently?";

export default function DeleteButton({
  onDelete: onDeleteProp,
  className,
  postId,
  commentId,
}) {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deleteMutation, { loading }] = useMutation(mutation, {
    update(proxy, result) {
      if (!commentId) {
        // update cache
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        const newGetPosts = data.getPosts.filter((post) => post.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { ...data, getPosts: newGetPosts },
        });
      }
      // only remove comment
      else {
      }

      if (typeof onDeleteProp === "function") onDeleteProp();
    },
    onError(err) {
      console.log(err);
      alert("Something went wrong, try again later.\n Try logging in again.");
    },
    variables: { postId, commentId },
  });

  const onDelete = (e) => {
    e.stopPropagation();

    if (
      (commentId && window.confirm(DELETE_COMMENT_MESSAGE)) ||
      window.confirm(DELETE_POST_MESSAGE)
    ) {
      deleteMutation();
    }
  };

  return (
    <button className={className} disabled={loading} onClick={onDelete}>
      Delete&nbsp;{commentId ? "Comment" : "Post"}
    </button>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
