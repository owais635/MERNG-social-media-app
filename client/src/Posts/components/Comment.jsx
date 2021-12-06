import React from "react";

export default function Comment({ id, username, createdAt, body }) {
  return (
    <div
      style={{ padding: "8px", margin: "8px 0px", border: "solid 1px grey" }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <h4>{username}</h4>
        &nbsp;
        <p style={{ fontSize: 12 }}>{new Date(createdAt).toLocaleString()}</p>
      </div>

      <p style={{ marginTop: 8 }}>{body}</p>
    </div>
  );
}
