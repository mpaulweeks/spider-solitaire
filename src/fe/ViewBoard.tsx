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
`;
const CompColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

export function ViewBoard(props: { board: Board, trigger: Trigger<Board> }) {
  return (
    <CompBoard>
      <CompHeader>
        <button onClick={props.trigger(board => board.deal())}>Deal</button>
      </CompHeader>
      <CompColumnContainer>
        {props.board.columns.map(column => (
          <ViewColumn column={column} />
        ))}
      </CompColumnContainer>
    </CompBoard>
  );
}
