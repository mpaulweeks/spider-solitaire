import React from 'react';
import { Board, Card, Column, Trigger } from "../logic";

import styled from 'styled-components';
const CompCard = styled.div<{ color: string }>`
  --suit: ${props => props.color};
  padding: 0.5em;
  width: 4em;
  text-align: center;
  color: var(--suit);
  border: 1px solid var(--suit);
  border-radius: 0.5em;
`;

const suitToSymbol = [
  '♠️',
  '♥️',
  '♦️',
  '♣️',
];
const suitToColor = [
  'black',
  'red',
  'darkviolet',
  'green',
];
const valueToString = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

export function ViewCard(props: {
  column: Column,
  card: Card,
  trigger: Trigger<Board>,
}) {
  const {
    column,
    card,
    trigger,
  } = props;
  if (card.state.faceUp) {
    return (
      <CompCard color={suitToColor[card.suit]} onClick={trigger(b => b.move({ columnIndex: column.index, cardIndex: card.state.index, }))}>
        {valueToString[card.value]} {suitToSymbol[card.suit]}
      </CompCard>
    )
  }
  return (
    <CompCard color='grey'>
      ???
    </CompCard>
  );
}
