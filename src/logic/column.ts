import { Card } from "./card";
import { CardState, ColumnState } from "./types";

export class Column {
  constructor(readonly index: number, readonly cards: Card[] = []) { }

  deal(state: CardState) {
    this.cards.push(new Card(state));
  }
  revealBottom() {
    this.cards[this.cards.length - 1]?.reveal();
  }
  private indexOf(card: Card): number {
    return this.cards.findIndex(c => c.state.index === card.state.index);
  }
  canMove(card: Card) {
    if (!card.state.faceUp) { return false; }
    const index = this.indexOf(card);
    if (index < 0) { return false; }
    if (index === this.cards.length - 1) { return true; }
    // todo detect chain
    return false;
  }
  pop(topCard: Card): Card[] {
    const index = this.indexOf(topCard);
    if (index < 0) { throw new Error('illegal move'); }
    const popped: Card[] = [];
    while (this.cards.length > index) {
      popped.push(this.cards.pop()!);
    }
    return popped.reverse();
  }
  push(newCards: Card[]): void {
    this.cards.push(...newCards);
  }

  getCurrent(): Card | undefined {
    return this.cards[this.cards.length - 1];
  }

  serialize(): ColumnState {
    return {
      index: this.index,
      cards: this.cards.map((c) => c.serialize()),
    };
  }
  static deserialize(state: ColumnState) {
    const cards = state.cards.map((card) => Card.deserialize(card));
    return new Column(state.index, cards);
  }
}
