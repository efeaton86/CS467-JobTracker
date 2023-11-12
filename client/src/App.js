import React, { useState, useEffect } from "react";
// Configure routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddJob from "./components/AddJobApp";
import Applications from "./pages/Applications";
import logo from './logo.svg';
import './styles/Applications.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/contacts/').then(res => res.json()).then(data => {
      setCurrentTime(data.hello);
    });
  }, []);
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <p>The current time is {currentTime}.</p>
    //   </header>
    // </div>
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Applications /> } />
            <Route path="/add-job" element={<AddJob />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
