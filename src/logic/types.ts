export type CardCode = number; // svv

export type DeckData = CardCode[];

export type CardState = {
  code: CardCode;
  faceUp: boolean;
};
export type ColumnState = {
  cards: CardState[];
}
export type BoardState = {
  originalDeck: DeckData;
  remainingDeck: DeckData;
  columns: ColumnState[];
}

export interface Callback<T> {
  (arg: T): void;
}
export interface Trigger<T> {
  (cb: Callback<T>): Callback<any>;
}
