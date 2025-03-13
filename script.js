// Importing the board functions
const { createNewBoard, renderBoard } = require('./board/board');
const { getMove, makeMove } = require('./board/moves');

// Initialize the board
const board = createNewBoard();
renderBoard(board);

// Create loop and player moves
while (true) {
    try {
        const moveX = getMove('X', board);
        makeMove('X', board, moveX);
        renderBoard(board);

        const moveO = getMove('O', board);
        makeMove('O', board, moveO);
        renderBoard(board)
    } catch (error) {
        console.log(error.message)
    }
}

