import React from "react";

export default function NavBar() {
  return (
    <nav style={{ margin: 8, display: "flex", justifyContent: "space-evenly" }}>
      <a href="/">Posts</a>
      <a href="/login/">Login</a>
      <a href="/register/">Register</a>
    </nav>
  );
}
