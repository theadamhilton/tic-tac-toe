const { getAllLineCoords, getWinner, isBoardTie } = require('./winner');

describe('Winner Functions', () => {
    describe('getAllLineCoords', () => {
        test('should return all possible winning lines', () => {
            const expectedLines = [
                // Rows
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                // Columns
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                // Diagonals
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]],
            ];

            expect(getAllLineCoords()).toEqual(expectedLines);
        });
    });

    describe('getWinner', () => {
        test('should return X as the winner for a row match', () => {
            const board = [
                ['X', 'X', 'X'],
                [null, null, null],
                [null, null, null],
            ];

            expect(getWinner(board)).toBe('X');
        });

        test('should return O as the winner for a column match', () => {
            const board = [
                ['O', null, null],
                ['O', null, null],
                ['O', null, null],
            ];

            expect(getWinner(board)).toBe('O');
        });

        test('should return X as the winner for a diagonal match', () => {
            const board = [
                ['X', null, null],
                [null, 'X', null],
                [null, null, 'X'],
            ];

            expect(getWinner(board)).toBe('X');
        });

        test('should return null if there is no winner', () => {
            const board = [
                ['X', 'O', 'X'],
                ['O', 'X', 'O'],
                ['O', 'X', 'O'],
            ];

            expect(getWinner(board)).toBeNull();
        });
    });

    describe('isBoardTie', () => {
        test('should return true if the board is full with no winner', () => {
            const board = [
                ['X', 'O', 'X'],
                ['O', 'X', 'O'],
                ['O', 'X', 'O'],
            ];

            expect(isBoardTie(board)).toBe(true);
        });

        test('should return false if there is a winner', () => {
            const board = [
                ['X', 'X', 'X'],
                ['O', 'O', null],
                [null, null, null],
            ];

            expect(isBoardTie(board)).toBe(false);
        });

        test('should return false if the board is not full', () => {
            const board = [
                ['X', 'O', 'X'],
                ['O', null, 'O'],
                ['O', 'X', 'O'],
            ];

            expect(isBoardTie(board)).toBe(false);
        });
    });
});
