import { Card } from "./card";
import { CardCode, CardState } from "./types";

export class Column {
  readonly cards: Card[] = [];

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

  serialize(): CardState[] {
    return this.cards.map((c) => c.serialize());
  }
}
