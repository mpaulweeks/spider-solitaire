import React, { useCallback, useEffect, useState } from 'react';
import { Board, Callback, GenerateDeck, History, Pointers } from '../logic';
import { ViewBoard } from './ViewBoard';

const history = new History(GenerateDeck(4));

export function App() {
  const [boardState, setBoardState] = useState(history.peek());
  const [hover, setHover] = useState(undefined as Pointers | undefined);

  const triggerBoard = useCallback((cb: Callback<Board>) => {
    const onTrigger = (e: any) => {
      e && e.preventDefault && e.preventDefault();
      const newBoard = Board.deserialize(boardState);
      cb(newBoard);
      history.push(newBoard.serialize());
      setBoardState(history.peek());
    };
    return onTrigger;
  }, [boardState, setBoardState]);

  const undo = useCallback(() => {
    history.pop();
    setBoardState(history.peek());
  }, [setBoardState]);

  const reset = useCallback((newBoard: Board) => {
    history.reset(newBoard.serialize());
    setBoardState(history.peek());
  }, [setBoardState]);

  useEffect(() => {
    window.addEventListener('keypress', evt => {
      if (evt.code === 'KeyZ') {
        undo();
      };
    });
  }, [undo]);

  const board = Board.deserialize(boardState);
  const possibleMoves = hover ? board.possibleMoves(hover) : [];
  return (
    <ViewBoard
      board={board}
      possibleMoves={possibleMoves}
      onHover={setHover}
      undo={undo}
      trigger={triggerBoard}
      reset={reset} />
  );
}
