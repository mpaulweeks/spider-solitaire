import React from 'react';
import { Board, Callback, Card, Column, Pointers, Trigger } from "../logic";

import styled from 'styled-components';
const CompCard = styled.div<{ color: string, canMoveTo: boolean }>`
  --suit: ${props => props.color};
  padding: 0.5em;
  width: 4em;
  text-align: center;
  color: var(--suit);
  border: 1px solid var(--suit);
  border-radius: 0.5em;

  cursor: pointer;

  background-color: ${props => props.canMoveTo ? 'lightgreen' : 'white'};
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
  card: Card | undefined,
  canMove: boolean;
  onHover: Callback<Pointers | undefined>,
  trigger: Trigger<Board>,
}) {
  const {
    column,
    card,
    canMove,
    onHover,
    trigger,
  } = props;
  if (!card) {
    return (
      <CompCard canMoveTo={canMove} color='grey'>
        (empty)
      </CompCard>
    );
  }
  if (card.state.faceUp) {
    const pointer: Pointers = { columnIndex: column.index, cardId: card.state.id, };
    return (
      <CompCard
        canMoveTo={canMove}
        color={suitToColor[card.suit]}
        onClick={trigger(b => b.performMove(pointer))}
        onMouseEnter={() => onHover(pointer)}
        onMouseLeave={() => onHover(undefined)}
      >
        {valueToString[card.value]} {suitToSymbol[card.suit]}
      </CompCard>
    );
  }
  return (
    <CompCard canMoveTo={canMove} color='grey'>
      ???
    </CompCard>
  );
}
