# Tic-Tac-Toe Game

A modern, interactive Tic-Tac-Toe game built with Next.js, React, and Tailwind CSS. This project features a responsive design, animations, score tracking, and game history.

![Tic-Tac-Toe Game Screenshot](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=800)

## Table of Contents

- [Features](#features)
- [Technical Implementation](#technical-implementation)
- [Game Logic](#game-logic)
- [Component Structure](#component-structure)
- [State Management](#state-management)
- [UI/UX Design](#uiux-design)
- [How to Play](#how-to-play)
- [Future Enhancements](#future-enhancements)

## Features

- **Interactive Game Board**: Responsive and animated game board with visual feedback
- **Player Turn Indicator**: Clear indication of which player's turn it is
- **Win Detection**: Automatic detection of winning combinations with visual highlighting
- **Draw Detection**: Automatic detection of draw games
- **Score Tracking**: Keeps track of X wins, O wins, and draws
- **Game History**: Records the outcome of each game with timestamps
- **Reset Options**: Reset the current game or all scores and history
- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Animations**: Smooth animations for placing X and O pieces
- **Accessibility**: Built with accessibility in mind

## Technical Implementation

### Technologies Used

- **Next.js**: React framework for server-side rendering and routing
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript for better code quality
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library
- **shadcn/ui**: Component library based on Radix UI

### Project Structure

\`\`\`
/components
  /ui                 # UI components from shadcn/ui
  /tic-tac-toe.tsx    # Main game component
/app
  /page.tsx           # Main page that renders the game
  /layout.tsx         # Root layout
  /globals.css        # Global styles
\`\`\`

## Game Logic

The game implements the classic Tic-Tac-Toe rules:

1. Players take turns placing X or O on a 3x3 grid
2. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins
3. If all cells are filled and no player has won, the game is a draw

### Win Detection

The game checks for wins after each move by examining all possible winning patterns:
- 3 rows (horizontal)
- 3 columns (vertical)
- 2 diagonals

\`\`\`typescript
const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];
\`\`\`

## Component Structure

### Main Components

- **TicTacToe**: The main game component that manages the game state and renders the board
- **Card**: Container for the game board and score panels
- **Tabs**: Used to switch between score summary and game history
- **Badge**: Used to display scores
- **Button**: Used for game controls

### Game Board

The game board is implemented as a CSS Grid with 3x3 cells. Each cell is a clickable area that renders either an X, an O, or nothing based on the game state.

## State Management

The game uses React's `useState` and `useEffect` hooks to manage state:

- **board**: Array of 9 elements representing the game board (null, "X", or "O")
- **currentPlayer**: Tracks whose turn it is ("X" or "O")
- **winner**: Tracks the winner of the game (null, "X", "O", or "Draw")
- **scores**: Object tracking the number of wins for each player and draws
- **gameHistory**: Array of objects recording the outcome of each game
- **winningCombination**: Array of indices representing the winning cells for highlighting
- **gameCount**: Counter for the total number of games played

## UI/UX Design

### Color Scheme

- Player X: Rose (red) color
- Player O: Teal color
- Winning combination: Green highlight
- Draw: Amber color indicators

### Animations

- X pieces animate in with a rotation
- O pieces animate in with a scale effect
- Cells have hover and tap animations for better interactivity

### Responsive Design

- Single column layout on mobile devices
- Two-column layout (game board and scores) on larger screens
- Properly sized elements that work on all screen sizes

## How to Play

1. The game starts with Player X's turn
2. Click on any empty cell to place your mark (X or O)
3. Players alternate turns until someone wins or the game ends in a draw
4. The winner is the first player to get three of their marks in a row
5. The game automatically detects wins and draws
6. Use the "New Game" button to reset the board and start a new game
7. Use the "Reset All" button to clear all scores and history

### Score Tracking

The game keeps track of:
- Number of X wins
- Number of O wins
- Number of draws
- Total games played

### Game History

The history tab shows:
- The outcome of each game (who won or if it was a draw)
- The time each game ended

## Future Enhancements

Potential features for future versions:

- AI opponent with multiple difficulty levels
- Online multiplayer mode
- Customizable player names
- Confetti animation for wins
- Persistent storage to save game state between sessions
- Undo/redo functionality
- Game timer
- Custom board sizes (4x4, 5x5)
- Theme customization

## License

MIT License
