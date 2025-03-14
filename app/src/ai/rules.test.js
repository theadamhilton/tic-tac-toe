const { randomAiMove, findWinningAndLosingMoves } = require('./rules');

describe('AI Rules Functions', () => {
    describe('randomAiMove', () => {
        test('should select a valid empty spot on the board', () => {
            const board = [
                [null, null, null],
                [null, 'X', null],
                ['O', null, null],
            ];

            const move = randomAiMove(board);

            // Ensure the selected spot is an empty spot (null)
            expect(board[move[0]][move[1]]).toBe(null);
        });

        test('should throw an error when no moves are available', () => {
            const board = [
                ['X', 'O', 'X'],
                ['O', 'X', 'O'],
                ['O', 'X', 'O'],
            ];

            // Expect an error when the board is full
            expect(() => randomAiMove(board)).toThrow('No more moves available!');
        });
    });

    describe('findWinningAndLosingMoves', () => {
        test('should select a winning move for the AI', () => {
            const board = [
                ['X', null, 'X'],
                ['O', 'O', null],
                [null, null, 'X'],
            ];

            const move = findWinningAndLosingMoves(board, 'X');

            // Simulate making the move and ensure it results in a win for X
            board[move[0]][move[1]] = 'X';
            const isWin = checkWinner(board, 'X');
            expect(isWin).toBe(true);
        });

        test('should block the opponent\'s winning move', () => {
            const board = [
                ['O', 'O', null],
                ['X', 'X', null],
                [null, null, null],
            ];

            const move = findWinningAndLosingMoves(board, 'X');

            // Ensure the move blocks the opponent (O)
            expect(move).toEqual([0, 2]); // Blocking move to stop O from winning
        });

        test('should fallback to a random move if no winning or blocking moves are available', () => {
            const board = [
                [null, 'X', 'O'],
                ['X', 'O', 'X'],
                ['O', 'X', 'O'],
            ];

            const move = findWinningAndLosingMoves(board, 'X');

            // Ensure the move is a valid empty spot
            expect(board[move[0]][move[1]]).toBe(null);
        });
    });
});

/**
 * Helper function to simulate checking for a winner
 * @param {Array} board - The game board.
 * @param {string} player - The player ('X' or 'O').
 * @returns {boolean} - True if the player has won, false otherwise.
 */
function checkWinner(board, player) {
    const winningLines = [
        [[0, 0], [1, 0], [2, 0]], // Top row
        [[0, 1], [1, 1], [2, 1]], // Middle row
        [[0, 2], [1, 2], [2, 2]], // Bottom row
        [[0, 0], [0, 1], [0, 2]], // Left column
        [[1, 0], [1, 1], [1, 2]], // Middle column
        [[2, 0], [2, 1], [2, 2]], // Right column
        [[0, 0], [1, 1], [2, 2]], // Top-left to bottom-right diagonal
        [[0, 2], [1, 1], [2, 0]], // Bottom-left to top-right diagonal
    ];

    for (const line of winningLines) {
        if (line.every(([x, y]) => board[x][y] === player)) {
            return true;
        }
    }
    return false;
}
