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
  private relIndexOf(card: Card): number {
    return this.cards.findIndex(c => c.state.index === card.state.index);
  }
  canMove(card: Card) {
    if (!card.state.faceUp) { return false; }
    const index = this.relIndexOf(card);
    if (index < 0) { return false; }
    if (index === this.cards.length - 1) { return true; }
    const head = this.getHead();
    if (head) {
      const headIndex = this.relIndexOf(head);
      if (headIndex > 0 && headIndex <= index) {
        return true;
      }
    }
    return false;
  }
  pop(topCard: Card): Card[] {
    const index = this.relIndexOf(topCard);
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

  getHead(): Card | undefined {
    let relIndex = this.cards.length - 1;
    let head = this.cards[relIndex];
    let parent = this.cards[relIndex - 1];
    while (parent && head && head.canMoveBelowCard(parent)) {
      relIndex--;
      head = this.cards[relIndex];
      parent = this.cards[relIndex - 1];
    }
    return head;
  }
  getLeaf(): Card | undefined {
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
