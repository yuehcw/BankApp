import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
