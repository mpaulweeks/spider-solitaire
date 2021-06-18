export type CardCode = number; // svv
export type DeckData = CardCode[];

export type CardState = {
  code: CardCode;
  faceUp: boolean;
};
export type ColumnState = {
  cards: CardState[];
};
export type BoardState = {
  originalDeck: DeckData;
  remainingDeck: DeckData;
  columns: ColumnState[];
};

export type Callback<T> = (arg: T) => void;
export type Trigger<T> = (cb: Callback<T>) => Callback<any>;
