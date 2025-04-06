import React from "react";
import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router";
import Home from "./Components/Home";
import Completed from "./Components/Completed";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/completed">Completed</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
