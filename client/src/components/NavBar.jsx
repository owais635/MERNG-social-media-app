import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function NavBar() {
  const authContext = useContext(AuthContext);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: 8 }}
    >
      {authContext.user && (
        <h1 style={{ color: "#16A085" }}>{authContext.user.username}</h1>
      )}

      <nav
        style={{
          flex: 1,
          margin: 8,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <a href="/">Posts</a>
        {authContext.user && (
          <button onClick={authContext.logout}>Logout</button>
        )}
        {!authContext.user && (
          <>
            <a href="/login/">Login</a>
            <a href="/register/">Register</a>
          </>
        )}
      </nav>
    </div>
  );
}
