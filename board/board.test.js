const { createNewBoard, renderBoard } = require('./board');

describe('Board Functions', () => {
    test('createNewBoard should create a 3x3 board filled with null', () => {
        const board = createNewBoard();
        
        // Verify that the board has 3 rows
        expect(board.length).toBe(3);

        // Verify that each row has 3 columns
        expect(board[0].length).toBe(3);

        // Verify that all cells are null
        for (let row of board) {
            for (let cell of row) {
                expect(cell).toBe(null);
            }
        }
    });

    test('renderBoard should not throw errors and log output', () => {
        const board = createNewBoard();

        // Mock console.log to test output
        console.log = jest.fn();

        renderBoard(board);

        // Check that console.log was called at least once
        expect(console.log).toHaveBeenCalled();
    });
});
