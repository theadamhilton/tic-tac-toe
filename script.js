const { createNewBoard, renderBoard } = require('./board/board');
const { getMove, makeMove } = require('./board/moves');
const { getWinner, isBoardTie } = require('./board/winner');
const { findWinningAndLosingMoves } = require('./ai/rules');
const prompt = require('prompt-sync')({ sigint: true });

// Function to select the game mode
function selectGameMode() {
    console.log("Select a game mode:");
    console.log("1. User vs AI");
    console.log("2. User vs User");
    console.log("3. AI vs AI");

    const mode = prompt("Enter your choice (1, 2, or 3): ");
    if (!['1', '2', '3'].includes(mode)) {
        console.log("Invalid choice. Defaulting to User vs AI.");
        return '1';
    }
    return mode;
}

// Function to check game status (winner or tie)
function checkGameStatus(board, player) {
    if (getWinner(board)) {
        console.log(`Player ${player} is the winner!`);
        return true;
    }

    if (isBoardTie(board)) {
        console.log("It's a tie!");
        return true;
    }

    return false;
}

// Main game function
function playGame() {
    const mode = selectGameMode();
    const board = createNewBoard();
    renderBoard(board);

    let gameOver = false;

    while (!gameOver) {
        try {
            if (mode === '1') {
                // User vs AI
                const moveX = getMove('X', board);
                makeMove('X', board, moveX);
                renderBoard(board);

                if (checkGameStatus(board, 'X')) {
                    gameOver = true;
                    break;
                }

                console.log("Thinking...");
                const moveO = findWinningAndLosingMoves(board, 'O');
                makeMove('O', board, moveO);
                renderBoard(board);

                if (checkGameStatus(board, 'O')) {
                    gameOver = true;
                    break;
                }
            } else if (mode === '2') {
                // User vs User
                const moveX = getMove('X', board);
                makeMove('X', board, moveX);
                renderBoard(board);

                if (checkGameStatus(board, 'X')) {
                    gameOver = true;
                    break;
                }

                const moveO = getMove('O', board);
                makeMove('O', board, moveO);
                renderBoard(board);

                if (checkGameStatus(board, 'O')) {
                    gameOver = true;
                    break;
                }
            } else if (mode === '3') {
                // AI vs AI
                console.log("AI (Player X) is making a move...");
                const moveX = findWinningAndLosingMoves(board, 'X');
                makeMove('X', board, moveX);
                renderBoard(board);

                if (checkGameStatus(board, 'X')) {
                    gameOver = true;
                    break;
                }

                console.log("AI (Player O) is making a move...");
                const moveO = findWinningAndLosingMoves(board, 'O');
                makeMove('O', board, moveO);
                renderBoard(board);

                if (checkGameStatus(board, 'O')) {
                    gameOver = true;
                    break;
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

// Replay or Exit Function
function replayOrExit() {
    while (true) {
        const choice = prompt("Do you want to play again? (yes or no): ").toLowerCase();
        if (choice === 'yes') {
            return true; // Replay the game
        } else if (choice === 'no') {
            console.log("Thanks for playing!");
            return false; // Exit the game
        } else {
            console.log("Invalid input. Please enter 'yes' or 'no'.");
        }
    }
}

// Start the Game with Replay Option
function main() {
    let keepPlaying = true;

    while (keepPlaying) {
        playGame();
        keepPlaying = replayOrExit();
    }
}

main();
