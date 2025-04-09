import React from "react";
import "./Board.scss";
import Square from "../square/Square";
import WinnerLine from "../winner-line/WinnerLine";
import WinnerDisplay from "../winner-display/WinnerDisplay";
import DrawIndicator from "../draw-indicator/DrawIndicator";
import { getWinnerLine } from "../../utils/gameUtils";

const Board = ({ squares, winner, onSquareClick, isDraw }) => {
  const winnerLine = winner ? getWinnerLine(squares) : null;
  const boardClasses = isDraw ? "board draw-state" : "board";

  return (
    <div className={boardClasses}>
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => (
            <Square
              key={col}
              value={squares[row * 3 + col]}
              onSquareClick={() => onSquareClick(row * 3 + col)}
            />
          ))}
        </div>
      ))}
      <WinnerLine winnerLine={winnerLine} />
      <WinnerDisplay winner={winner} />
      <DrawIndicator isDraw={isDraw} squares={squares} />
    </div>
  );
};

export default Board;
