function makeMove(player, board, moveCoords) {
    const [row, col] = moveCoords;

    if (board[row][col] !== null) {
        throw new Error('Invalid move! This cell is already taken.');
    }

    const newBoard = board.map((rowValues, rowIndex) =>
        rowIndex === row
            ? rowValues.map((value, colIndex) =>
                  colIndex === col ? player : value
              )
            : rowValues
    );

    return newBoard;
}

module.exports = { makeMove };
