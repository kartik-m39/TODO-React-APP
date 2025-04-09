import React from "react";
import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router";
import Home from "./Components/Home";
import Completed from "./Components/Completed";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="bg-black p-4">
          <div className="container mx-auto flex justify-center space-x-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-white ${
                  isActive ? "text-yellow-400" : ""
                } hover:text-yellow-400`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                `text-white ${
                  isActive ? "text-yellow-400" : ""
                } hover:text-yellow-400`
              }
            >
              Completed
            </NavLink>
          </div>
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
