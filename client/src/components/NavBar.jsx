import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function NavBar() {
  const authContext = useContext(AuthContext);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: 8 }}
    >
      {authContext.user && <h1>{authContext.user.username}</h1>}

      <nav
        style={{
          flex: 1,
          margin: 8,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <a href="/">Posts</a>
        <a href="/login/">Login</a>
        <a href="/register/">Register</a>
      </nav>
    </div>
  );
}
