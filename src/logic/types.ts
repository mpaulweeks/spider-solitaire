export type CardCode = number; // svv
export type CardState = {
  id: number;
  code: CardCode;
  faceUp: boolean;
};
export type DeckState = CardState[];
export type ColumnState = {
  index: number;
  cards: CardState[];
};
export type BoardState = {
  originalDeck: DeckState;
  remainingDeck: DeckState;
  columns: ColumnState[];
};

export type Callback<T> = (arg: T) => void;
export type Trigger<T> = (cb: Callback<T>) => Callback<any>;
