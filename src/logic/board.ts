import { Column } from "./column";
import { BoardState, DeckData } from "./types";
import { range } from "./util";

export class Board {
  readonly columns: Column[];
  readonly remainingDeck: DeckData;
  constructor(readonly originalDeck: DeckData) {
    const numColumns = 10;
    this.columns = range(numColumns).map((_) => new Column());
    this.remainingDeck = originalDeck.concat();

    // deal all but 5 deals
    for (let i = 0; this.remainingDeck.length > 5 * numColumns; i++) {
      const column = this.columns[i % this.columns.length];
      column.dealFaceDown(this.remainingDeck.pop()!);
    }

    // reveal bottom
    this.columns.forEach((c) => c.revealBottom());
  }

  deal() {
    if (this.remainingDeck.length < this.columns.length) {
      throw new Error("deal is impossible");
    }
    this.columns.forEach((c) => c.dealFaceUp(this.remainingDeck.pop()!));
  }

  serialize(): BoardState {
    return {
      originalDeck: this.originalDeck,
      remainingDeck: this.remainingDeck,
      columns: this.columns.map(c => c.serialize()),
    };
  }
}
