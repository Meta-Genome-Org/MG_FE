import logo from './logo.svg';
import './App.css';
import NavBar from './Coponents/NavBar';
import React from "react";
import About from './Coponents/About';
import Home from './Coponents/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './Coponents/Contact';
import Tutorial from './Coponents/Tutorial';
import Contribute from './Coponents/Contribute';

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
