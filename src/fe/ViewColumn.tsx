import React from 'react';
import { ViewCard } from './ViewCard';
import { Board, Column, Trigger } from "../logic";

import styled from 'styled-components';
const CompColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;

  padding: 1em;
`;

export function ViewColumn(props: {
  column: Column,
  trigger: Trigger<Board>,
}) {
  const {
    column,
    trigger,
  } = props;
  return (
    <CompColumn>
      {props.column.cards.map((card, ci) => (
        <ViewCard key={ci} column={column} card={card} trigger={trigger} />
      ))}
    </CompColumn>
  )
}
