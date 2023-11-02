import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route, Link, Routes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>The current time is {currentTime}.</p>
        </header>
      </div>

    </Router>
  );
}

export default App;
