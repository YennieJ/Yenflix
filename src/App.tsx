import React from "react";
import GlobalStyle from "./Global.styled";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      {/* <GlobalStyle /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<Home />} />

        <Route path="tv" element={<Tv />} />
        <Route path="search" element={<Search />} />
        {/* <Route path="temp/:id" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
