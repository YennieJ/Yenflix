import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Login from "Components/User/Login";
import Singup from "Components/User/Singup";
import Password from "Components/User/Password";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/signup/password" element={<Password />} />

        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<Home />} />

        <Route path="tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
