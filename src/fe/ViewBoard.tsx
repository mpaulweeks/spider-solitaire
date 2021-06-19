import React from 'react';
import { Board, Callback, CardState, Column, GenerateDeck, Pointers, Trigger } from "../logic";
import { ViewColumn } from './ViewColumn';

import styled from 'styled-components';
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
`;
const CompColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

export function ViewBoard(props: {
  board: Board,
  possibleMoves: Column[],
  onHover: Callback<Pointers | undefined>,
  trigger: Trigger<Board>,
  reset: Callback<Board>,
}) {
  const {
    board,
    possibleMoves,
    onHover,
    trigger,
    reset,
  } = props;
  const remainingDeals = board.remainingDeals();
  const possibleMoveIds = possibleMoves.map(col => col.index);
  return (
    <CompBoard>
      <CompHeader>
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
        {remainingDeals ? (
          <button onClick={trigger(b => b.deal())}>
            Deal {remainingDeals}
          </button>
        ) : null}
      </CompHeader>
      <CompColumnContainer>
        {board.columns.map((column, ci) => (
          <ViewColumn key={ci} column={column} canReceiveHover={possibleMoveIds.includes(ci)} onHover={onHover} trigger={trigger} />
        ))}
      </CompColumnContainer>
    </CompBoard>
  );
}
