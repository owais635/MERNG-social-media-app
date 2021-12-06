import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import "./main.css";
import Errors from "../components/Errors";

export default function PostForm() {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      setBody(""); // clear body
      console.log("res", result);
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { body },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const bodyText = e.target[0].value.trim();

    if (bodyText === "") alert("Body cannot be empty");

    setErrors({}); // clear errors
    createPost();
  };
  return (
    <div className="post-card" style={{ maxWidth: 300, boxShadow: "none" }}>
      <form onSubmit={onSubmit}>
        <textarea
          value={body}
          rows="4"
          cols="38"
          required
          placeholder="Type some text to post"
          onChange={(e) => setBody(e.target.value)}
          style={{ resize: "vertical" }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <Errors errors={errors} />
    </div>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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
