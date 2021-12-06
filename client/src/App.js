import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import AuthProvider, { AuthContext } from "./context/auth";
import Posts from "./Posts/Posts";
import PostDetails from "./Posts/PostDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NavBar from "./components/NavBar";

// https://stackoverflow.com/a/69869761
const AuthRoute = () => {
  const context = useContext(AuthContext);
  return context.user ? <Navigate to="/" /> : <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Posts />} />
          <Route exact path="/posts/:id" element={<PostDetails />} />
          {/* only allow access to these pages when not logged in */}
          <Route element={<AuthRoute />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
