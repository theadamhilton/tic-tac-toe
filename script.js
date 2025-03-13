const { createNewBoard, renderBoard } = require('./board/board');
const { getMove, makeMove } = require('./board/moves');
const { getWinner, isBoardTie } = require('./board/winner');
const { findWinningAndLosingMoves } = require('./ai/rules');

// Initialize the board
const board = createNewBoard();
renderBoard(board);

while (true) {
    try {
        // Player X's turn (human)
        const moveX = getMove('X', board);
        makeMove('X', board, moveX);
        renderBoard(board);

        // Check if Player X wins or if it's a tie
        if (getWinner(board)) {
            console.log('Player X is the winner!');
            break;
        }
        if (isBoardTie(board)) {
            console.log("It's a tie!");
            break;
        }

        // Player O's turn (AI)
        console.log("Thinking...");
        const moveO = findWinningAndLosingMoves(board, 'O');
        makeMove('O', board, moveO);
        renderBoard(board);

        // Check if Player O wins or if it's a tie
        if (getWinner(board)) {
            console.log('Player O is the winner!');
            break;
        }
        if (isBoardTie(board)) {
            console.log("It's a tie!");
            break;
        }
    } catch (error) {
        console.log(error.message);
    }
}
