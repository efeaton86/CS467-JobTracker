import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route, Link, Routes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Skills from "./skills-pages/skills";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/contacts/').then(res => res.json()).then(data => {
      setCurrentTime(data.hello);
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Skills />

      </div>

    </Router>
  );
}

export default App;
