import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the Tic-Tac-Toe board with 9 squares', () => {
    // Render the App component
    render(<App />);

    // Verify that 9 squares are rendered
    const squares = screen.getAllByRole('button'); // Each square is a button
    expect(squares).toHaveLength(9);

    // Verify that squares start empty
    squares.forEach((square) => {
        expect(square).toHaveTextContent('');
    });
});

test('allows users to click squares and alternates turns', () => {
    // Render the App component
    render(<App />);

    // Get all squares
    const squares = screen.getAllByRole('button');

    // Simulate Player X clicking the first square
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');

    // Simulate Player O clicking the second square
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');

    // Simulate Player X clicking the third square
    fireEvent.click(squares[2]);
    expect(squares[2]).toHaveTextContent('X');
});

test('prevents overriding a square once clicked', () => {
    // Render the App component
    render(<App />);

    // Get all squares
    const squares = screen.getAllByRole('button');

    // Simulate Player X clicking the first square
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');

    // Try to click the same square again (Player O's turn)
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X'); // The square should remain as "X"
});
