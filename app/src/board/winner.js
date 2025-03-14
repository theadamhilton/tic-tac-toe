/**
 * Generate all possible winning line coordinates for the board.
 * @returns {Array} - Array of line coordinates.
 */
function getAllLineCoords() {
    const BOARD_WIDTH = 3;
    const BOARD_HEIGHT = 3;

    const lines = [];

    // Generate row coordinates
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        const row = [];
        for (let x = 0; x < BOARD_WIDTH; x++) {
            row.push([x, y]);
        }
        lines.push(row);
    }

    // Generate column coordinates
    for (let x = 0; x < BOARD_WIDTH; x++) {
        const col = [];
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            col.push([x, y]);
        }
        lines.push(col);
    }

    // Generate diagonal coordinates
    lines.push([[0, 0], [1, 1], [2, 2]]); // Top-left to bottom-right
    lines.push([[0, 2], [1, 1], [2, 0]]); // Bottom-left to top-right

    return lines;
}

/**
 * Check if there is a winner on the board.
 * @param {Array} board - The game board.
 * @returns {string|null} - The winning player ('X' or 'O') or null if no winner.
 */
function getWinner(board) {
    const lines = getAllLineCoords();

    for (const line of lines) {
        const [a, b, c] = line;
        const values = [board[a[0]][a[1]], board[b[0]][b[1]], board[c[0]][c[1]]];

        // Check if all three values are the same and not null
        if (values.every((val) => val === 'X')) {
            return 'X';
        } else if (values.every((val) => val === 'O')) {
            return 'O';
        }
    }

    return null; // No winner
}

/**
 * Check if the board is in a tie state.
 * @param {Array} board - The game board.
 * @returns {boolean} - True if the board is in a tie state, false otherwise.
 */
function isBoardTie(board) {
    // If there's a winner, it's not a tie
    if (getWinner(board) !== null) {
        return false;
    }

    // Check if all cells are filled (no null values)
    for (const row of board) {
        if (row.includes(null)) {
            return false; // Still empty cells, so not a tie
        }
    }

    return true; // No winner and no empty cells = tie
}

// Export the functions for use in other files
module.exports = {
    getAllLineCoords,
    getWinner,
    isBoardTie
};
