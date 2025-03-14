// Function to create a new 3x3 board
function createNewBoard() {
    const BOARD_WIDTH = 3;
    const BOARD_HEIGHT = 3;

    // Create a 2D array filled with null values
    const board = Array.from({ length: BOARD_WIDTH }, () => Array(BOARD_HEIGHT).fill(null));
    return board;
}

// Function to render the board in the console
function renderBoard(board) {
    console.log("  0 1 2 ");
    console.log("  ------");
    
    for (let y = 0; y < board.length; y++) {
        let row = `${y}|`;
        for (let x = 0; x < board[y].length; x++) {
            row += board[x][y] === null ? "  " : `${board[x][y]} `;
        }
        row += "|";
        console.log(row);
    }
    console.log("  ------");
}

// Exporting the functions for use in other files
module.exports = {
    createNewBoard,
    renderBoard
};