// Importing makeMove from moves.js
const { makeMove } = require('./moves');

describe('Moves Functions', () => {
    describe('makeMove', () => {
        test('should update the board with the player\'s move', () => {
            const board = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            const moveCoords = [1, 1];
            const player = 'X';

            // Make the move
            const updatedBoard = makeMove(player, board, moveCoords);

            // Check if the move was placed correctly
            expect(updatedBoard[1][1]).toBe('X');
        });

        test('should throw an error when the cell is already occupied', () => {
            const board = [
                [null, null, null],
                [null, 'X', null],
                [null, null, null]
            ];
            const moveCoords = [1, 1];
            const player = 'O';

            // Expect an error to be thrown
            expect(() => makeMove(player, board, moveCoords)).toThrow('Invalid move! This cell is already taken.');
        });
    });
});
