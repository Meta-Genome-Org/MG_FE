import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Contribute from './Components/Contribute';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Tutorial from './Components/Tutorial';

function App() {
  return (
    <Router>
    <NavBar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/Contribute" element={<Contribute />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
