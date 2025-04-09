import React from "react";
import "./WinnerLine.scss";

const WinnerLine = ({ winnerLine }) => {
  if (!winnerLine) return null;

  return (
    <div
      className={`winner-line ${winnerLine.type}`}
      style={winnerLine.style}
    />
  );
};

export default WinnerLine;
