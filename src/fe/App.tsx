import React, { useCallback, useState } from 'react';
import { Board, Callback, GenerateDeck } from '../logic';
import { ViewBoard } from './ViewBoard';

function App() {
  const [board, setBoard] = useState(new Board(GenerateDeck(4)));

  const triggerBoard = useCallback((cb: Callback<Board>) => {
    const onTrigger = () => {
      cb(board);
      setBoard(board);
    };
    return onTrigger;
  }, [board, setBoard]);

  return <ViewBoard board={board} trigger={triggerBoard} />;
}

export default App;
