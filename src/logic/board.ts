import { Card } from "./card";
import { Column } from "./column";
import { BoardState, DeckState, Pointers } from "./types";
import { range } from "./util";

export class Board {
  readonly originalDeck: DeckState;
  readonly remainingDeck: DeckState;
  readonly columns: Column[];
  constructor(args: {
    originalDeck: DeckState;
    remainingDeck: DeckState;
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
    this.columns.forEach((c) => {
      c.deal(this.remainingDeck.pop()!);
      c.revealBottom();
    });
  }
  private resolvePointers(pointers: Pointers): { column: Column, card: Card | undefined } {
    const column = this.columns.filter(c => c.index === pointers.columnIndex)[0];
    const card = column.cards.filter(c => c.state.id === pointers.cardId)[0];
    return { column, card };
  }
  private possibleMovesFromObj(column: Column, card?: Card): Column[] {
    if (!card) { return []; }
    const otherCols = range(this.columns.length - 1).map(i => {
      const colId = (column.index + i + 1) % this.columns.length;
      return this.columns[colId];
    });
    const valid = otherCols.filter(col => card.canMoveBelowColumn(col));
    return valid;
  }
  possibleMoves(pointers: Pointers) {
    const { column, card } = this.resolvePointers(pointers);
    return this.possibleMovesFromObj(column, card);
  }
  performMoveToPile(pointers: Pointers) {
    const { column, card } = this.resolvePointers(pointers);
    if (!card) { return; }
    const canMove = column.canMove(card);
    if (!canMove) { return; }
    const possibleMoves = this.possibleMovesFromObj(column, card);
    const nonEmpty = possibleMoves.filter(col => col.cards.length > 0);
    const dest = nonEmpty[0];
    if (dest) {
      const popped = column.pop(card);
      dest.push(popped);
    }
  }
  performMoveToEmpty(pointers: Pointers) {
    const { column, card } = this.resolvePointers(pointers);
    if (!card) { return; }
    const canMove = column.canMove(card);
    if (!canMove) { return; }
    const possibleMoves = this.possibleMovesFromObj(column, card);
    const empty = possibleMoves.filter(col => col.cards.length === 0);
    const dest = empty[0];
    if (dest) {
      const popped = column.pop(card);
      dest.push(popped);
    }
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

  static createNew(originalDeck: DeckState) {
    const numColumns = 10;
    const columns = range(numColumns).map(i => new Column(i));
    const remainingDeck = originalDeck.concat();

    // deal all but 5 deals
    for (let i = 0; remainingDeck.length > 5 * numColumns; i++) {
      const column = columns[i % columns.length];
      column.deal(remainingDeck.pop()!);
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
