const prompt = require('prompt-sync')({ sigint: true }); // For user input

/**
 * Get the player's move.
 * @param {string} player - The current player ('X' or 'O').
 * @param {Array} board - The game board.
 * @returns {Array} - The coordinates of the move [x, y].
 */
function getMove(player, board) {
    console.log(`Player ${player}, it's your turn!`);

    while (true) {
        try {
            // Get x and y coordinates from the player
            const x = parseInt(prompt("Enter the x-coordinate (0, 1, or 2): "));
            const y = parseInt(prompt("Enter the y-coordinate (0, 1, or 2): "));

            // Validate input
            if (isNaN(x) || isNaN(y) || x < 0 || x > 2 || y < 0 || y > 2) {
                console.log("Invalid input! Please enter numbers between 0 and 2.");
                continue;
            }

            // Check if the cell is empty
            if (board[x][y] !== null) {
                console.log("This cell is already taken. Please choose another.");
                continue;
            }

            return [x, y];
        } catch (error) {
            console.log("An error occurred. Please try again.");
        }
    }
}

/**
 * Make a move on the board.
 * @param {string} player - The current player ('X' or 'O').
 * @param {Array} board - The game board.
 * @param {Array} moveCoords - The coordinates of the move [x, y].
 * @returns {Array} - The updated board.
 */
function makeMove(player, board, moveCoords) {
    const [x, y] = moveCoords;

    // Check if the move is valid
    if (board[x][y] !== null) {
        throw new Error("Invalid move! This cell is already taken.");
    }

    // Place the player's marker on the board
    board[x][y] = player;
    return board;
}

// Export the functions
module.exports = {
    getMove,
    makeMove
};
