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

export function ViewCard(props: { card: Card }) {
  const { card } = props;
  if (card.state.faceUp) {
    const color = card.suit === 2 ? 'red' : 'black';
    return (
      <CompCard color={color}>
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
