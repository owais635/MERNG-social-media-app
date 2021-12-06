import React, { createContext, useReducer } from "react";

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
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
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
