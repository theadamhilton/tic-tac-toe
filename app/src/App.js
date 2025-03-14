import React, { useState } from 'react';
import Board from './components/Board';
import { getWinner, isBoardTie } from './board/winner';
import { findWinningAndLosingMoves } from './ai/rules';
import './App.css';

function App() {
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
    const [status, setStatus] = useState('Next player: X');

    const handleSquareClick = (row, col) => {
        if (board[row][col] || getWinner(board)) return; // Ignore invalid clicks
    
        // User's move (Player X)
        const newBoard = board.map((rowValues, rowIndex) =>
            rowIndex === row
                ? rowValues.map((value, colIndex) =>
                      colIndex === col ? 'X' : value
                  )
                : rowValues
        );
        setBoard(newBoard);
    
        // Check if the user wins or it's a tie
        const winner = getWinner(newBoard);
        if (winner) {
            setStatus(`Player ${winner} wins!`);
            return;
        }
        if (isBoardTie(newBoard)) {
            setStatus("It's a tie!");
            return;
        }
    
        // AI's move (Player O)
        setTimeout(() => {
            const aiMove = findWinningAndLosingMoves(newBoard, 'O');
            const updatedBoard = newBoard.map((rowValues, rowIndex) =>
                rowIndex === aiMove[0]
                    ? rowValues.map((value, colIndex) =>
                          colIndex === aiMove[1] ? 'O' : value
                      )
                    : rowValues
            );
            setBoard(updatedBoard);
    
            // Check if the AI wins or it's a tie
            const aiWinner = getWinner(updatedBoard);
            if (aiWinner) {
                setStatus('Player O wins!');
                return;
            }
            if (isBoardTie(updatedBoard)) {
                setStatus("It's a tie!");
                return;
            }
    
            // Switch back to Player X
            setStatus('Next player: X');
        }, 500); // Add a short delay for a more natural AI response
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
