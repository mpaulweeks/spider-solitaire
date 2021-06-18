import React from 'react';
import { Card } from "../logic";

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
  '♥️',
  '♠️',
  '♦️',
  '♣️',
];
const suitToColor = [
  'red',
  'black',
  'darkviolet',
  'green',
];

export function ViewCard(props: { card: Card }) {
  const { card } = props;
  if (card.state.faceUp) {
    return (
      <CompCard color={suitToColor[card.suit]}>
        {card.value} {suitToSymbol[card.suit]}
      </CompCard>
    )
  }
  return (
    <CompCard color='grey'>
      ???
    </CompCard>
  );
}
