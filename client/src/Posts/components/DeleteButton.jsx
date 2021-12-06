import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../queries";

const DELETE_MESSAGE = "Are you sure you want to delete this Post permanently?";

export default function DeleteButton({
  onDelete: onDeleteProp,
  className,
  id,
}) {
  const [deletePost, { loading }] = useMutation(DELETE_POST_MUTATION, {
    update(proxy, result) {
      // update cache
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const newGetPosts = data.getPosts.filter((post) => post.id !== id);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { ...data, getPosts: newGetPosts },
      });

      if (typeof onDeleteProp === "function") onDeleteProp();
    },
    onError(err) {
      console.log(err);
      alert("Something went wrong, try again later.");
    },
    variables: { postId: id },
  });

  const onDelete = (e) => {
    e.stopPropagation();
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
