import React from 'react';
import { Board, GenerateDeck } from '../logic';
import { ViewBoard } from './ViewBoard';

function App() {
  const board = new Board(GenerateDeck(4));
  return <ViewBoard board={board} />;
}

export default App;
