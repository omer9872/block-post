import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// import pages...
import Login from './pages/auth/login.auth'
import Home from './pages/homepage.page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}