import React from "react";
import "../Styles/UnderConstruction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";


const UnderConstructionVirt = () => {
  return (
    <div className="under-construction-container">
      <h1 className="title">Under Construction</h1>
      <p className="message">
        We're working hard to bring you a great experience. Check back soon!
      </p>
      <FontAwesomeIcon icon={faToolbox} size="4x" />
    </div>
  );
};

export default UnderConstructionVirt;
