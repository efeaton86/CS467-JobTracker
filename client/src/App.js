import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route, Link, Routes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Skills from "./pages/Skills";

function App() {

  return (
    <Router>
      
      <div className="App">
        <Skills />
      </div>

    </Router>
  );
}

export default App;
