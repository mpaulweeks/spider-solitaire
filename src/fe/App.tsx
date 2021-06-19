import React, { useCallback, useState } from 'react';
import { Board, Callback, GenerateDeck, Pointers } from '../logic';
import { ViewBoard } from './ViewBoard';

export function App() {
  const [boardState, setBoardState] = useState(Board.createNew(GenerateDeck(4)).serialize());
  const [hover, setHover] = useState(undefined as Pointers | undefined);

  const triggerBoard = useCallback((cb: Callback<Board>) => {
    const onTrigger = (e: any) => {
      e && e.preventDefault && e.preventDefault();
      const newBoard = Board.deserialize(boardState);
      cb(newBoard);
      setBoardState(newBoard.serialize());
    };
    return onTrigger;
  }, [boardState, setBoardState]);

  const reset = useCallback((newBoard: Board) => {
    setBoardState(newBoard.serialize());
  }, [setBoardState]);

  const board = Board.deserialize(boardState);
  const possibleMoves = hover ? board.possibleMoves(hover) : [];
  return (
    <ViewBoard
      board={board}
      possibleMoves={possibleMoves}
      onHover={setHover}
      trigger={triggerBoard}
      reset={reset} />
  );
}
