import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./main.css";
import { AuthContext } from "../context/auth";
import LikeButton from "./components/LikeButton";
import DeleteButton from "./components/DeleteButton";

export default function PostCard({
  id,
  body,
  createdAt,
  username,
  likeCount,
  commentCount,
  likes,
}) {
  const { user } = useContext(AuthContext);

  return (
    <div className="post-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>{username}</h5>&nbsp;
        <p style={{ fontSize: 12 }}>{new Date(createdAt).toLocaleString()}</p>
      </div>

      <p style={{ margin: "8px 0px" }}>{body}</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            user && user.username === username ? "space-between" : "end",
        }}
      >
        {user && user.username === username && (
          <DeleteButton className="delete-post-btn" id={id} />
        )}

        <div>
          <LikeButton user={user} id={id} likes={likes} likeCount={likeCount} />
          <Link
            style={{ marginTop: 4, textDecoration: "none" }}
            to={`/posts/${id}`}
          >
            <span>{commentCount}</span>&nbsp;Comment
          </Link>
        </div>
      </div>
    </div>
  );
}
