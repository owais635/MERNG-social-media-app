import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

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
        <Link to="/">Posts</Link>

        {authContext.user && (
          <button onClick={authContext.logout}>Logout</button>
        )}
        {!authContext.user && (
          <>
            <Link to="/login/">Login</Link>
            <Link to="/register/">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
}
