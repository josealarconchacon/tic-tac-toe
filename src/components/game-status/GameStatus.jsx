import React from "react";
import "./GameStatus.scss";

const GameStatus = ({ winner, isDraw, xIsNext, gameStarted = true }) => {
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw"
    : gameStarted
    ? `Next player: ${xIsNext ? "×" : "○"}`
    : "Make your move!";

  const statusClass = winner
    ? "status winner"
    : isDraw
    ? "status draw"
    : "status";

  const playerIndicator = !winner && !isDraw && (
    <span className={`player-indicator ${xIsNext ? "player-x" : "player-o"}`}>
      {xIsNext ? "×" : "○"}
    </span>
  );

  return (
    <div className={statusClass}>
      <span className="status-text">{status}</span>
      {playerIndicator}
    </div>
  );
};

export default GameStatus;
