import React from 'react';
import { ViewCard } from './ViewCard';
import { Column } from "../logic";

import styled from 'styled-components';
const CompColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

export function ViewColumn(props: { column: Column }) {
  return (
    <CompColumn>
      {props.column.cards.map(card => (
        <ViewCard card={card} />
      ))}
    </CompColumn>
  )
}
