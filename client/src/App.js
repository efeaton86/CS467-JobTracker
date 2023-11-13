import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route, Link, Routes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Contacts from "./pages/Contacts";
import Applications from "./pages/Applications";
import Skills from "./pages/Skills";
import Navigation from "./components/navbar/Navigation";

function App() {

  return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Applications />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </Router>
  );
}

export default App;

