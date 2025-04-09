import { useState, useEffect } from "react";
import "./App.scss";
import Board from "./components/board/Board";
import GameStatus from "./components/game-status/GameStatus";
import ResetButton from "./components/reset-button/ResetButton";
import ConfettiEffect from "./components/confetti-effect/ConfettiEffect";
import DrawEffect from "./components/draw-effect/DrawEffect";
import { calculateWinner } from "./utils/gameUtils";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showDrawEffect, setShowDrawEffect] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "×" : "○";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square);

  // Activate draw effect when game ends in a draw
  useEffect(() => {
    if (isDraw && !showDrawEffect && !isResetting) {
      setShowDrawEffect(true);
    }
  }, [isDraw, showDrawEffect, isResetting]);

  const resetGame = () => {
    setIsResetting(true);
    setShowDrawEffect(false);
    setSquares(Array(9).fill(null));
    setXIsNext(true);

    // Reset the isResetting flag after a short delay
    setTimeout(() => {
      setIsResetting(false);
    }, 100);
  };

  const handleDrawEffectComplete = () => {
    // Optional: You can add logic here for when the animation completes
    console.log("Draw effect animation completed");
  };

  return (
    <main>
      <h1>Tic Tac Toe</h1>

      <div className="game-container">
        <GameStatus
          winner={winner}
          isDraw={isDraw}
          xIsNext={xIsNext}
          gameStarted={gameStarted}
        />

        <Board
          squares={squares}
          winner={winner}
          isDraw={isDraw}
          onSquareClick={handleClick}
        />

        <ResetButton onReset={resetGame} />
      </div>

      <ConfettiEffect winner={winner} />
      <DrawEffect
        active={showDrawEffect}
        onComplete={handleDrawEffectComplete}
        duration={5000}
        onReset={resetGame}
      />
    </main>
  );
};

export default App;
