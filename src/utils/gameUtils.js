// Game utility functions

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function getWinnerLine(squares) {
  const lines = [
    // Horizontal lines - pass directly through centers
    {
      indices: [0, 1, 2],
      type: "horizontal",
      style: {
        top: "16.67%", // 1/6 of the way down (center of top row)
        left: "5%",
        width: "90%", // Slightly inset from edges
      },
    },
    {
      indices: [3, 4, 5],
      type: "horizontal",
      style: {
        top: "50%", // Half way down (center of middle row)
        left: "5%",
        width: "90%", // Slightly inset from edges
      },
    },
    {
      indices: [6, 7, 8],
      type: "horizontal",
      style: {
        top: "83.33%", // 5/6 of the way down (center of bottom row)
        left: "5%",
        width: "90%", // Slightly inset from edges
      },
    },
    // Vertical lines - pass directly through centers
    {
      indices: [0, 3, 6],
      type: "vertical",
      style: {
        left: "16.67%", // 1/6 of the way across (center of left column)
        top: "5%",
        height: "90%", // Slightly inset from edges
      },
    },
    {
      indices: [1, 4, 7],
      type: "vertical",
      style: {
        left: "50%", // Half way across (center of middle column)
        top: "5%",
        height: "90%", // Slightly inset from edges
      },
    },
    {
      indices: [2, 5, 8],
      type: "vertical",
      style: {
        left: "83.33%", // 5/6 of the way across (center of right column)
        top: "5%",
        height: "90%", // Slightly inset from edges
      },
    },
    // Diagonal lines - from corner to corner but contained within board
    {
      indices: [0, 4, 8],
      type: "diagonal-topleft",
      style: {
        top: "5%",
        left: "5%",
        width: "90%", // Inset diagonal line
        transformOrigin: "top left",
        transform: "rotate(45deg)",
      },
    },
    {
      indices: [2, 4, 6],
      type: "diagonal-topright",
      style: {
        top: "5%",
        right: "5%",
        width: "90%", // Inset diagonal line
        transformOrigin: "top right",
        transform: "rotate(-45deg)",
      },
    },
  ];

  for (const line of lines) {
    const [a, b, c] = line.indices;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
}
