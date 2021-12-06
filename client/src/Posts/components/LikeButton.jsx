import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useNavigate } from "react-router";

export default function LikeButton({ user, id, likeCount, likes }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const [likePost, { loading }] = useMutation(LIKE_POST, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId: id },
  });

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const onLike = () => {
    if (!user) {
      navigate("/login");
    }
    likePost();
  };

  return (
    <div>
      <span>{likeCount}</span>&nbsp;
      <button disabled={loading} onClick={onLike}>
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  );
}

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        username
      }
    }
  }
`;
