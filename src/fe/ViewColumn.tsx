import React from 'react';
import { ViewCard } from './ViewCard';
import { Board, Callback, Column, Pointers, Trigger } from "../logic";

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
  column: Column;
  canMove: boolean;
  onHover: Callback<Pointers | undefined>;
  trigger: Trigger<Board>;
}) {
  const {
    column,
    canMove,
    onHover,
    trigger,
  } = props;
  return (
    <CompColumn>
      {column.cards.length === 0 && (
        <ViewCard
          column={column}
          card={undefined}
          canMove={canMove}
          onHover={() => { }}
          trigger={trigger}
        />
      )}
      {column.cards.map((card, ci, arr) => (
        <ViewCard
          key={ci}
          column={column}
          card={card}
          canMove={canMove && ci === arr.length - 1}
          onHover={onHover}
          trigger={trigger}
        />
      ))}
    </CompColumn>
  )
}
