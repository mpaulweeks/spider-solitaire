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
  canReceiveHover: boolean;
  onHover: Callback<Pointers | undefined>;
  trigger: Trigger<Board>;
}) {
  const {
    column,
    canReceiveHover,
    onHover,
    trigger,
  } = props;
  return (
    <CompColumn>
      {column.cards.length === 0 && (
        <ViewCard
          column={column}
          card={undefined}
          canReceiveHover={canReceiveHover}
          onHover={() => undefined}
          trigger={trigger}
        />
      )}
      {column.cards.map((card, ci, arr) => (
        <ViewCard
          key={ci}
          column={column}
          card={card}
          canReceiveHover={canReceiveHover && ci === arr.length - 1}
          onHover={onHover}
          trigger={trigger}
        />
      ))}
    </CompColumn>
  )
}
