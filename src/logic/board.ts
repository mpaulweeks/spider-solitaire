import { Column } from "./column";
import { BoardState, DeckData } from "./types";
import { range } from "./util";

export class Board {
  readonly originalDeck: DeckData;
  readonly remainingDeck: DeckData;
  readonly columns: Column[];
  constructor(args: {
    originalDeck: DeckData;
    remainingDeck: DeckData;
    columns: Column[];
  }) {
    this.originalDeck = args.originalDeck;
    this.remainingDeck = args.remainingDeck;
    this.columns = args.columns;
  }

  remainingDeals() {
    return this.remainingDeck.length / this.columns.length;
  }
  deal() {
    if (this.remainingDeals() < 1) {
      throw new Error("deal is impossible");
    }
    this.columns.forEach((c) => c.dealFaceUp(this.remainingDeck.pop()!));
  }

  serialize(): BoardState {
    return {
      originalDeck: this.originalDeck,
      remainingDeck: this.remainingDeck,
      columns: this.columns.map((c) => c.serialize()),
    };
  }
  static deserialize(state: BoardState) {
    const columns = state.columns.map((column) => Column.deserialize(column));
    return new Board({
      ...state,
      columns,
    });
  }

  static createNew(originalDeck: DeckData) {
    const numColumns = 10;
    const columns = range(numColumns).map((_) => new Column());
    const remainingDeck = originalDeck.concat();

    // deal all but 5 deals
    for (let i = 0; remainingDeck.length > 5 * numColumns; i++) {
      const column = columns[i % columns.length];
      column.dealFaceDown(remainingDeck.pop()!);
    }

    // reveal bottom
    columns.forEach((c) => c.revealBottom());

    return new Board({
      originalDeck,
      remainingDeck,
      columns,
    });
  }
}
