import React, { useState } from 'react';
import Board from './components/Board';
import { makeMove } from './board/reactMoves'
import { getWinner, isBoardTie } from './board/winner';
import { findWinningAndLosingMoves } from './ai/rules';
import './App.css';

function App() {
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
    const [status, setStatus] = useState('');
    const [isPlayerX, setIsPlayerX] = useState(true);
    const [gameMode, setGameMode] = useState(null); // Track selected game mode
    const [gameOver, setGameOver] = useState(false);

    // Handle mode selection
    const handleModeSelection = (mode) => {
        setGameMode(mode);
        resetGame();
        if (mode === 'AI vs AI') {
            startAIAI();
        }
    };

    // Reset the game board and states
    const resetGame = () => {
        setBoard(Array(3).fill(Array(3).fill(null)));
        setStatus('Next Player: X');
        setGameOver(false);
    };

    // Handle square clicks
    const handleSquareClick = (row, col) => {
        if (board[row][col] || gameOver) return; // Ignore invalid clicks
    
        try {
            if (gameMode === 'User vs User') {
                // User vs User: Alternate turns
                const currentPlayer = isPlayerX ? 'X' : 'O';
                const newBoard = makeMove(currentPlayer, board, [row, col]);
                setBoard(newBoard);
    
                // Check for a win or tie
                const winner = getWinner(newBoard);
                if (winner) {
                    setStatus(`Player ${winner} wins!`);
                    setGameOver(true);
                    return;
                }
                if (isBoardTie(newBoard)) {
                    setStatus("It's a tie!");
                    setGameOver(true);
                    return;
                }
    
                // Switch turns
                setIsPlayerX(!isPlayerX);
                setStatus(`Next Player: ${isPlayerX ? 'O' : 'X'}`);
            } else if (gameMode === 'User vs AI') {
                // User vs AI: Player X moves, then AI moves
                const newBoard = makeMove('X', board, [row, col]);
                setBoard(newBoard);
    
                // Check if Player X wins or it's a tie
                const winner = getWinner(newBoard);
                if (winner) {
                    setStatus(`Player ${winner} wins!`);
                    setGameOver(true);
                    return;
                }
                if (isBoardTie(newBoard)) {
                    setStatus("It's a tie!");
                    setGameOver(true);
                    return;
                }
    
                // AI's turn
                setStatus('Thinking...');
                setTimeout(() => {
                    try {
                        const aiMove = findWinningAndLosingMoves(newBoard, 'O');
                        const updatedBoard = makeMove('O', newBoard, aiMove);
                        setBoard(updatedBoard);
    
                        // Check if AI wins or it's a tie
                        const aiWinner = getWinner(updatedBoard);
                        if (aiWinner) {
                            setStatus('Player O wins!');
                            setGameOver(true);
                            return;
                        }
                        if (isBoardTie(updatedBoard)) {
                            setStatus("It's a tie!");
                            setGameOver(true);
                            return;
                        }
    
                        // Back to Player X
                        setStatus('Next Player: X');
                    } catch (error) {
                        console.error(error.message);
                    }
                }, 500); // Simulate AI delay
            }
        } catch (error) {
            console.error(error.message);
        }
    };    

    const startAIAI = () => {
        let currentPlayer = 'X';
    
        const playAIMove = (currentBoard) => {
            if (gameOver) return; // Stop if the game is over
    
            setTimeout(() => {
                try {
                    setStatus(`Next Player: ${currentPlayer}`);

                    const aiMove = findWinningAndLosingMoves(currentBoard, currentPlayer);
                    const updatedBoard = makeMove(currentPlayer, currentBoard, aiMove);
                    setBoard(updatedBoard);
    
                    // Check for a win or tie
                    const winner = getWinner(updatedBoard);
                    if (winner) {
                        setStatus(`Player ${winner} wins!`);
                        setGameOver(true);
                        return;
                    }
                    if (isBoardTie(updatedBoard)) {
                        setStatus("It's a tie!");
                        setGameOver(true);
                        return;
                    }
    
                    // Switch AI player
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    playAIMove(updatedBoard); // Recursively call for the next AI move
                } catch (error) {
                    console.error(error.message);
                }
            }, 500); // Short delay for each AI move
        };
    
        playAIMove(board); // Start the AI vs AI game
    };
    
    // Replay or Exit Handler
    const handleReplayOrExit = (choice) => {
        if (choice === 'replay') {
            resetGame();
        } else if (choice === 'exit') {
            resetGame();
            setGameMode(null); // Reset mode selection to let the user choose again
        }
    };

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>

            {!gameMode && (
                <div className="game-mode-selection">
                    <h2>Select Game Mode:</h2>
                    <button onClick={() => handleModeSelection('User vs AI')}>User vs AI</button>
                    <button onClick={() => handleModeSelection('User vs User')}>User vs User</button>
                    <button onClick={() => handleModeSelection('AI vs AI')}>AI vs AI</button>
                </div>
            )}

            {gameMode && (
                <>
                    <p>{status || 'Next player: X'}</p>
                    <Board board={board} onSquareClick={handleSquareClick} />
                </>
            )}

            {gameOver && (
                <div className="replay-exit-options">
                    <h2>Game Over</h2>
                    {gameMode !== 'AI vs AI' && (
                        <button onClick={() => handleReplayOrExit('replay')}>Replay</button>
                    )}
                    <button onClick={() => handleReplayOrExit('exit')}>Exit</button>
                </div>
            )}
        </div>
    );
}

export default App;
