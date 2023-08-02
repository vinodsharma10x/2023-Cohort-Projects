import React from "react";
import GlobalStyles from "styles/GlobalStyles";

import ComponentRenderer from "ComponentRenderer.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Signup from "pages/Signup";
import AboutUs from "pages/AboutUs";
import Search from "pages/Search.js";
import Home from "pages/Home.js";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route
            path="/components/:type/:subtype/:name"
            element={<ComponentRenderer />}
          />
          <Route
            path="/components/:type/:name"
            element={<ComponentRenderer />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}
