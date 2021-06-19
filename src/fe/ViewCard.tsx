import React from 'react';
import { Board, Callback, Card, Column, Pointers, Trigger } from "../logic";

import styled from 'styled-components';
const CompCard = styled.div<{ color: string, background: string, canMove: boolean }>`
  --suit: ${props => props.color};
  padding: 0.5em;
  width: 4em;
  text-align: center;
  color: var(--suit);
  background: ${props => props.background};
  border: 1px solid var(--suit);
  border-radius: 0.5em;
  cursor: ${props => props.canMove ? 'pointer' : 'not-allowed'};
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
  'A',
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
  canReceiveHover: boolean;
  onHover: Callback<Pointers | undefined>,
  trigger: Trigger<Board>,
}) {
  const {
    column,
    card,
    canReceiveHover,
    onHover,
    trigger,
  } = props;
  if (!card) {
    const background = canReceiveHover ? 'lightgreen' : 'white';
    return (
      <CompCard canMove={false} color='grey' background={background}>
        (empty)
      </CompCard>
    );
  }
  if (card.state.faceUp) {
    const pointer: Pointers = { columnIndex: column.index, cardId: card.state.id, };
    const canMove = column.canMove(card);
    const background = (
      (!canMove && 'lightgrey') ||
      (canReceiveHover && 'lightgreen') ||
      'white'
    );
    return (
      <CompCard
        canMove={canMove}
        color={suitToColor[card.suit]}
        background={background}
        onClick={trigger(b => b.performMoveToPile(pointer))}
        onContextMenu={trigger(b => b.performMoveToEmpty(pointer))}
        onMouseEnter={() => onHover(pointer)}
        onMouseLeave={() => onHover(undefined)}
      >
        {valueToString[card.value]} {suitToSymbol[card.suit]}
      </CompCard>
    );
  }
  const background = `repeating-linear-gradient(
    45deg,
    #606dbc,
    #606dbc 10px,
    #465298 10px,
    #465298 20px
  )`;
  return (
    <CompCard canMove={false} color='white' background={background}>
      ???
    </CompCard>
  );
}
