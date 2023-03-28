import React from "react";
import royce from "../Assets/Royce_Logo.png";
import ukmmn from "../Assets/UKMMN_Logo.png";
import "../Styles/Footer.css";

function Footer() {
    return (
      <div className="footer">
        <p>In collaboration with:</p>
        <div className="associates">
          <img src={royce} alt="Royce Institute" />
          <img src={ukmmn} alt="UKMMN" />
        </div>
        <p>&copy; 2023 meta-genome.org</p>
      </div>
    );
  }
  

export default Footer;