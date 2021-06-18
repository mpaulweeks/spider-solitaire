import { Card } from "./card";
import { CardCode, ColumnState } from "./types";

export class Column {
  constructor(readonly cards: Card[] = []) {}

  dealFaceDown(code: CardCode) {
    this.cards.push(new Card({ code, faceUp: false }));
  }
  dealFaceUp(code: CardCode) {
    this.cards.push(new Card({ code, faceUp: true }));
  }
  revealBottom() {
    this.cards[this.cards.length - 1]?.reveal();
  }

  getCurrent(): Card | undefined {
    return this.cards[this.cards.length - 1];
  }

  serialize(): ColumnState {
    return {
      cards: this.cards.map((c) => c.serialize()),
    };
  }
  static deserialize(state: ColumnState) {
    const cards = state.cards.map((card) => Card.deserialize(card));
    return new Column(cards);
  }
}
