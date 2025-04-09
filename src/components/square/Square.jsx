import React from "react";
import "./Square.scss";

const Square = ({ value, onSquareClick }) => {
  // Determine which player's mark to render
  const renderMark = () => {
    if (!value) return null;

    const player = value === "×" ? "x" : "o";
    return <span data-player={player}>{value}</span>;
  };

  return (
    <button className="square" onClick={onSquareClick}>
      {renderMark()}
    </button>
  );
};

export default Square;
