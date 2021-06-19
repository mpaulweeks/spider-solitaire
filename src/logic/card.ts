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
  private canMoveBelowCard(parent: Card) {
    return this.value + 1 === parent.value;
  }
  canMoveTogether(parent: Card) {
    return this.suit === parent.suit && this.canMoveBelowCard(parent);
  }
  canMoveBelowColumn(column: Column) {
    const current = column.getLeaf();
    return !current || this.canMoveBelowCard(current);
  }

  serialize(): CardState {
    return this.state;
  }
  static deserialize(state: CardState) {
    return new Card(state);
  }
}
