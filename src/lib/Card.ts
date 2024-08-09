import { Rank, Suit } from "../types/cardTypes";
import { getEnumKeyByValue } from "../utils/getEnumKeyByValue";

export class Card {
  private _suit: Suit;
  private _rank: Rank;
  public get suit(): Suit {
    return this._suit;
  }
  public get rank(): Rank {
    return this._rank;
  }

  constructor(rank: Rank, suit: Suit) {
    this._suit = suit;
    this._rank = rank;
  }

  public count(): number {
    return this._rank > 10 ? 10 : this._rank;
  }

  public print() {
    return {
      rank: getEnumKeyByValue(Rank, this._rank),
      suit: getEnumKeyByValue(Suit, this._suit),
      count: this.count(),
    };
  }
  public printReadableStr() {
    return `${getEnumKeyByValue(Rank, this._rank)} of ${getEnumKeyByValue(Suit, this._suit)}`;
  }
}
