import { Column } from "./column";
import { CardState } from "./types";

export class Card {
  readonly suit: number;
  readonly value: number;
  constructor(readonly state: CardState) {
    this.suit = Math.floor(state.code / 100);
    this.value = state.code % 100;
  }

  reveal() {
    this.state.faceUp = true;
  }
  canMoveBelowCard(parent: Card) {
    return (this.value + 1) === parent.value;
  }
  canMoveBelowColumn(column: Column) {
    const current = column.getCurrent();
    return !current || this.canMoveBelowCard(current);
  }

  serialize(): CardState {
    return this.state;
  }
}
