import React from 'react';
import { Board } from "../logic";
import { ViewColumn } from './ViewColumn';

import styled from 'styled-components';
const CompBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

export function ViewBoard(props: { board: Board }) {
  return (
    <CompBoard>
      {props.board.columns.map(column => (
        <ViewColumn column={column} />
      ))}
    </CompBoard>
  );
}
