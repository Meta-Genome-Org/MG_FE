import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './Components/Contact';
import Contribute from './Components/Contribute';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Virtual_lab from './Components/Virtual_lab';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
    <NavBar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Contribute" element={<Contribute />} />
        <Route path="/Virtual Lab" element={<Virtual_lab />} />
        <Route path="/Contact us" element={<Contact />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
