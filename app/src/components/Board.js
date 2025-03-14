import React from 'react';
import Square from './Square';

function Board({ board, onSquareClick }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((value, colIndex) => (
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            value={value}
                            onClick={() => onSquareClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
