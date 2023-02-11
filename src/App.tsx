import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import User from "Components/User";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<User />} />

        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<Home />} />

        <Route path="tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
