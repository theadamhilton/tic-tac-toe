// src/components/Game.js
import React, { useState } from 'react';
import Board from './components/Board';
import { getWinner, isBoardTie } from './board/winner';
import './App.css';

function App() {
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
    const [isPlayerX, setIsPlayerX] = useState(true);
    const [status, setStatus] = useState('Next player: X');

    const handleSquareClick = (row, col) => {
        if (board[row][col] || getWinner(board)) {
            return; // Ignore clicks if the cell is filled or if the game is over
        } 

        // Update the board state
        const newBoard = board.map((rowValues, rowIndex) =>
            rowIndex === row
                ? rowValues.map((value, colIndex) =>
                      colIndex === col ? (isPlayerX ? 'X' : 'O') : value
                  )
                : rowValues
        );
        setBoard(newBoard);

        // Check for a winner or a tie
        const winner = getWinner(newBoard);
        if (winner) {
            setStatus(`Player ${winner} wins!`);
        } else if (isBoardTie(newBoard)) {
            setStatus("It's a tie!");
        } else {
            setIsPlayerX(!isPlayerX); // Switch turns
            setStatus(`Next player: ${isPlayerX ? 'O' : 'X'}`);
        }
    };

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>
            <p>{status}</p>
            <Board board={board} onSquareClick={handleSquareClick} />
        </div>
    );
}

export default App;
