import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const JWT_TOKEN_KEY = "jwtToken";

const initState = { user: null };

if (localStorage.getItem(JWT_TOKEN_KEY)) {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(JWT_TOKEN_KEY);
  } else {
    initState.user = decodedToken;
  }
}

export const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      throw new Error("Action not found.");
  }
}

export default function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initState);

  const login = (userData) => {
    localStorage.setItem(JWT_TOKEN_KEY, userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />

    // <AuthContext.Provider value={{ user: state.user, login, logout }}>
    //   {props.children}
    // </AuthContext.Provider>
  );
}
