import React from 'react';
import { Card } from "../logic";

const suitToSymbol = [
  '♥️',
  '♠️',
  '♦️',
  '♣️',
];

export function ViewCard(props: { card: Card }) {
  return (
    <div>
      {props.card.state.faceUp ? (
        <div>
          {props.card.value} {suitToSymbol[props.card.suit]}
        </div>
      ) : (
        <div>hidden</div>
      )}
    </div>
  );
}
