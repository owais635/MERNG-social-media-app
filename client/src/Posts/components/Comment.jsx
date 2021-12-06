import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import DeleteButton from "./DeleteButton";

export default function Comment({ id, postId, username, createdAt, body }) {
  const { user } = useContext(AuthContext);
  return (
    <div
      style={{ padding: "8px", margin: "8px 0px", border: "solid 1px grey" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h4>{username}</h4>
          &nbsp;
          <p style={{ fontSize: 12 }}>{new Date(createdAt).toLocaleString()}</p>
        </div>

        <DeleteButton postId={postId} commentId={id} />
      </div>

      <p style={{ marginTop: 8 }}>{body}</p>
    </div>
  );
}
