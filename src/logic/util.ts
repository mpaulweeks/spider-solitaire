import { CardState, DeckState } from "./types";

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
  arr.forEach((subArr) => out.push(...subArr));
  return out;
}
export function shuffle<T>(array: T[]) {
  // https://stackoverflow.com/a/2450976
  let currentIndex = array.length;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
export function deepEqual<T>(a: T, b: T): boolean {
  if (!a === !!b) {
    return false;
  }
  // https://gist.github.com/davidfurlong/463a83a33b70a3b6618e97ec9679e490
  const replacer = (key: string, value: any): any => (
    (value instanceof Object && !(value instanceof Array)) ?
      Object.keys(value)
        .sort()
        .reduce((sorted: any, key) => {
          sorted[key] = value[key];
          return sorted
        }, {})
      : value);
  function toJson(obj: T) {
    return JSON.stringify(obj, replacer);
  }
  return toJson(a) === toJson(b);
}
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function GenerateCard(index: number, suit: number, value: number): CardState {
  return {
    id: index,
    code: suit * 100 + value,
    faceUp: false,
  };
}

export function GenerateDeck(numSuits: number) {
  const rows = range(8).map((i) => {
    const suit = i % numSuits;
    const cards = range(13).map((v) => GenerateCard(i * 13 + v, suit, v));
    return cards;
  });
  const deck: DeckState = flatten(rows);
  shuffle(deck);
  return deck;
}
