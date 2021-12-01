import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Posts from "./Posts/Posts";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
