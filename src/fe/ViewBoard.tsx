import React from 'react';
import { Board, Callback, CardState, Column, EmptyCallback, GenerateDeck, Pointers, Trigger } from "../logic";
import { ViewColumn } from './ViewColumn';

import styled from 'styled-components';
import { toUnicode } from 'punycode';
const CompBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
`;
const CompHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;

  padding: 1em;

  & > * {
    margin-right: 1em;
  }
`;
const CompColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

export function ViewBoard(props: {
  board: Board;
  possibleMoves: Column[];
  onHover: Callback<Pointers | undefined>;
  undo: EmptyCallback;
  trigger: Trigger<Board>;
  reset: Callback<Board>;
}) {
  const {
    board,
    possibleMoves,
    onHover,
    undo,
    trigger,
    reset,
  } = props;
  const remainingDeals = board.remainingDeals();
  const possibleMoveIds = possibleMoves.map(col => col.index);
  return (
    <CompBoard>
      <CompHeader>
        <div>
          Restart game:
        </div>
        <button onClick={() => reset(Board.createNew(GenerateDeck(1)))}>
          1 suit
        </button>
        <button onClick={() => reset(Board.createNew(GenerateDeck(2)))}>
          2 suit
        </button>
        <button onClick={() => reset(Board.createNew(GenerateDeck(3)))}>
          3 suit
        </button>
        <button onClick={() => reset(Board.createNew(GenerateDeck(4)))}>
          4 suit
        </button>
      </CompHeader>
      <CompHeader>
        <div>
          <div>Left click to move to the next available pile</div>
          <div>Right click to move to the next empty pile</div>
        </div>
        {remainingDeals ? (
          <button onClick={trigger(b => b.deal())}>
            Deal {remainingDeals}
          </button>
        ) : null}
        <button onClick={undo}>
          Undo (Z)
        </button>
      </CompHeader>
      <CompColumnContainer>
        {board.columns.map((column, ci) => (
          <ViewColumn key={ci} column={column} canReceiveHover={possibleMoveIds.includes(ci)} onHover={onHover} trigger={trigger} />
        ))}
      </CompColumnContainer>
    </CompBoard>
  );
}
