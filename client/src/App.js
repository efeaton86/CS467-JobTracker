import React from "react";

// Configure routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddJob from "./components/AddJobApp";
import Contacts from "./pages/Contacts";
import Applications from "./pages/Applications";
import Skills from "./pages/Skills";

import logo from './logo.svg';
import './styles/Applications.css';
import './App.css';

function App() {

  return (
    <>
      <Navbar />
      <div className="App">
          <BrowserRouter>
             <Routes>
               <Route path="/applications" element={<Applications /> } />
               <Route path="/applications/add-job" element={<AddJob />} />
               <Route path="/contacts" element={<Contacts />} />
               <Route path="/skills" element={<Skills />} />
             </Routes>
          </BrowserRouter>
      </div>
    </>
  );
}

export default App;

