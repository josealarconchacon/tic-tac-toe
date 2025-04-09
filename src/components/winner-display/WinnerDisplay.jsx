import React from "react";
import "./WinnerDisplay.scss";

const WinnerDisplay = ({ winner }) => {
  if (!winner) return null;

  return <div className="winner-screen">{winner} Wins!</div>;
};

export default WinnerDisplay;
