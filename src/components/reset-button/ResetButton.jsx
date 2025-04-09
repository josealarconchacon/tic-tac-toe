import React from "react";
import "./ResetButton.scss";

const ResetButton = ({ onReset }) => (
  <button className="reset-button" onClick={onReset}>
    New Game
  </button>
);

export default ResetButton;
