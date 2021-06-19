import { Board } from "./board";
import { BoardState, DeckState } from "./types";
import { deepCopy, deepEqual } from "./util";

export class History {
  private history: BoardState[];
  constructor(deck: DeckState) {
    const board = Board.createNew(deck);
    this.history = [board.serialize()];
  }
  push(bs: BoardState) {
    const current = this.peek();
    if (!deepEqual(current, bs)) {
      this.history.push(bs);
    }
  }
  pop() {
    if (this.history.length > 1) {
      this.history.pop();
    }
  }
  peek() {
    return deepCopy(this.history[this.history.length - 1]);
  }
  reset(bs: BoardState) {
    this.history = [bs];
  }
}
