import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import Errors from "../components/Errors";

export default function CommentForm({ postId }) {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const [createComment, { loading }] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(proxy, result) {
      setBody(""); // clear body
      console.log("result", result);
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { postId, body },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const bodyText = e.target[0].value.trim();

    if (bodyText === "") alert("Body cannot be empty");

    setErrors({}); // clear errors
    createComment();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // padding: "8px",
        // margin: "8px 0px",
        // border: "solid 1px grey",
      }}
    >
      <form
        style={{
          margin: "8px 0px",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={onSubmit}
      >
        <textarea
          value={body}
          rows="4"
          cols="38"
          required
          placeholder="Type some text to post a comment"
          onChange={(e) => setBody(e.target.value)}
          style={{ resize: "vertical" }}
        />

        <button
          style={{ maxWidth: "fit-content", marginTop: "8px" }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <Errors errors={errors} />
    </div>
  );
}
const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;
