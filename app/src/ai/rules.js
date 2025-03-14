const { getWinner } = require('../board/winner');

/**
 * Find a winning move for the AI, or block the opponent's winning move.
 * @param {Array} board - The game board.
 * @param {string} player - The AI player ('X' or 'O').
 * @returns {Array} - The coordinates of the chosen move [x, y]
 */
function findWinningAndLosingMoves(board, player) {
    const opponent = player === 'X' ? 'O' : 'X';

    // Iterate over all cells in the board
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            // Check if the cell is empty
            if (board[x][y] === null) {
                // Simulate the AI making a move
                board[x][y] = player;
                if (getWinner(board) === player) {
                    board[x][y] = null; // Undo the move
                    return [x, y]; // Return the winning move
                }
                board[x][y] = null; // Undo the move

                // Simulate the opponent making a move
                board[x][y] = opponent;
                if(getWinner(board) === opponent) {
                    board[x][y] = null; // Undo the move
                    return [x, y]; // Return the blocking move
                }
                board[x][y] = null; // Undo the move
            }
        }
    }

    // If no winning or blocking moves, fallback to random move
    return randomAiMove(board);
}

/**
 * Get a random valid move for the AI.
 * @param {Array} board - The game board.
 * @returns {Array} - The coordinates of the random move [x, y].
 */
function randomAiMove(board) {
    const emptySpots = [];

    // Find all empty spots on the board
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] === null) {
                emptySpots.push([x, y]);
            }
        }
    }

    if (emptySpots.length === 0) {
        throw new Error("No more moves available!");
    }

    // Pick a random spot from the list of empty spots
    const randomIndex = Math.floor(Math.random() * emptySpots.length);
    return emptySpots[randomIndex];
}

// Export the function
module.exports = {
    randomAiMove,
    findWinningAndLosingMoves,
};
