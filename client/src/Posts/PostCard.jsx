import React from "react";
import { Link } from "react-router-dom";
import "./main.css";

export default function PostCard({
  id,
  body,
  createdAt,
  username,
  likeCount,
  commentCount,
}) {
  return (
    <div className="post-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>{username}</h5>&nbsp;
        <p style={{ fontSize: 12 }}>{new Date(createdAt).toLocaleString()}</p>
      </div>

      <p style={{ margin: "8px 0px" }}>{body}</p>

      <div style={{ display: "flex", justifyContent: "end" }}>
        <span>{likeCount}</span>&nbsp;<button>Like</button>
      </div>

      <Link
        style={{ display: "flex", justifyContent: "end", marginTop: 4 }}
        to={`/posts/${id}`}
      >
        <span>{commentCount}</span>&nbsp;Comment
      </Link>
    </div>
  );
}
