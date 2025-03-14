// src/components/Game.js
import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

function Game() {
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
    const [isPlayerX, setIsPlayerX] = useState(true);

    const handleSquareClick = (row, col) => {
        if (board[row][col]) return; // Ignore clicks on filled squares

        // Update the board state
        const newBoard = board.map((rowValues, rowIndex) =>
            rowIndex === row
                ? rowValues.map((value, colIndex) =>
                      colIndex === col ? (isPlayerX ? 'X' : 'O') : value
                  )
                : rowValues
        );
        setBoard(newBoard);
        setIsPlayerX(!isPlayerX); // Switch turns
    };

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>
            <Board board={board} onSquareClick={handleSquareClick} />
        </div>
    );
}

export default Game;
