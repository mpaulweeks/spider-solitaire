import React, { useCallback, useState } from 'react';
import { Board, Callback, GenerateDeck } from '../logic';
import { ViewBoard } from './ViewBoard';

function App() {
  const [boardState, setBoardState] = useState(Board.createNew(GenerateDeck(4)).serialize());

  const triggerBoard = useCallback((cb: Callback<Board>) => {
    const onTrigger = () => {
      const board = Board.deserialize(boardState);
      cb(board);
      setBoardState(board.serialize());
    };
    return onTrigger;
  }, [boardState, setBoardState]);

  const board = Board.deserialize(boardState);
  return <ViewBoard board={board} trigger={triggerBoard} />;
}

export default App;
