export type CardCode = number; // svv

export type DeckData = CardCode[];

export type CardState = {
  code: CardCode;
  faceUp: boolean;
};
