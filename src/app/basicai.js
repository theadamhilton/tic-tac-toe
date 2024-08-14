// AI Opponent lvl 1
if (idx !== 0 && typeof newSquares[idx - 1] !== 'string') {
    newSquares[idx - 1] = "O";
} else if (idx !== 0 && typeof newSquares[idx + 1] !== 'string') {
    newSquares[idx + 1] = "O";
} else if (idx !== 0 && typeof newSquares[idx - 1] === 'string' && typeof newSquares[idx + 1] === 'string' && typeof newSquares[0] !== 'string') {
    newSquares[0] = "O";
} else if(idx === 0 && typeof newSquares[idx + 1] !== 'string') {
    newSquares[idx + 1] = "O";
} else {
    newSquares[idx + 3] = "O";
}

