import React from 'react';
import { Board, Trigger } from "../logic";
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

export function ViewBoard(props: { board: Board, trigger: Trigger<Board> }) {
  const { board, trigger } = props;
  const remainingDeals = board.remainingDeals();
  return (
    <CompBoard>
      <CompHeader>
        {remainingDeals ? (
          <button onClick={trigger(board => board.deal())}>
            Deal {remainingDeals}
          </button>
        ) : null}
      </CompHeader>
      <CompColumnContainer>
        {board.columns.map((column, ci) => (
          <ViewColumn key={ci} column={column} />
        ))}
      </CompColumnContainer>
    </CompBoard>
  );
}
