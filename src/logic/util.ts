import { DeckData } from "./types";

export function range(length: number): number[] {
  const out = [] as number[];
  for (let i = 0; i < length; i++) {
    out.push(i);
  }
  return out;
}
export function flatten<T>(arr: T[][]): T[] {
  // dumb polyfill for jest
  // https://github.com/kulshekhar/ts-jest/issues/828
  const out = [] as T[];
  arr.forEach(subArr => out.push(...subArr));
  return out;
}
export function shuffle<T>(array: T[]) {
  // https://stackoverflow.com/a/2450976
  let currentIndex = array.length;
  let randomIndex = 0;;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function GenerateCard(suit: number, value: number) {
  return (suit * 100) + value;
}

export function GenerateDeck(numSuits: number) {
  const rows = range(8).map(i => {
    const suit = i % numSuits;
    const cards = range(13).map(v => GenerateCard(suit, v));
    return cards;
  });
  const deck: DeckData = flatten(rows);
  shuffle(deck);
  return deck;
}
