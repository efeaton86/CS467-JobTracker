import React, { useState, useEffect } from "react";
// Configure routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddJob from "./components/AddJobApp";
import Applications from "./pages/Applications";
import logo from './logo.svg';
import './styles/Applications.css';
import './App.css';
import Navbar from "./components/Navbar";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/contacts/').then(res => res.json()).then(data => {
      setCurrentTime(data.hello);
    });
  }, []);
  return (
    <>

    <Navbar />
    <div className="App">

        <BrowserRouter>
           <Routes>
             <Route path="/applications" element={<Applications /> } />
             <Route path="/applications/add-job" element={<AddJob />} />
           </Routes>
        </BrowserRouter>
    </div>
    </>
  );
}

export default App;
