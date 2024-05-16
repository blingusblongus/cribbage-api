import type { Rank, Suit } from "../types/cardTypes";

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
}
