import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useNavigate } from "react-router";

const DELETE_MESSAGE = "Are you sure you want to delete this Post permanently?";

export default function DeleteButton({ className, id }) {
  const navigate = useNavigate();

  const [deletePost, { loading }] = useMutation(DELETE_POST_MUTATION, {
    update(proxy, result) {
      console.log(result);
      // TODO remove from cache
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId: id },
  });

  const onDelete = () => {
    console.log({ id });
    if (window.confirm(DELETE_MESSAGE)) {
      deletePost();
    }
  };

  return (
    <button className={className} disabled={loading} onClick={onDelete}>
      Delete Post
    </button>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
