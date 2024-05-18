import { getCombinations } from "../utils/getCombinations";
import type { Card } from "./Card";

export class Hand {
    private _cards: Card[];
    private _pairs: Card[][] = [];
    private _fifteens: Card[][] = [];
    private _totalScore: number = 0;

    public get cards() { return this._cards };
    public get pairs() { return this._pairs };
    public get fifteens() { return this._fifteens };
    public get totalScore() { return this._totalScore };

    constructor(cards: Card[]) {
        if (cards.length > 5) {
            throw Error("Invalid hand: max 5 cards");
        }
        this._cards = cards;
        this.scoreHand();
    }


    private scoreHand() {
        for (let size = 5; size > 0; --size) {
            for (let set of getCombinations(this._cards, size)) {
                if (size > 1) {
                    // Check Fifteens
                    if (this.isFifteen(set)) this._fifteens.push(set);
                }
            }
        }
    }

    private isFifteen(combo: Card[]): boolean {
        let count = 0;
        for (let i = 0; i < combo.length; ++i) {
            count += combo[i].count();
            if (count > 15) return false;
        }
        return count === 15;
    }

    public get printFull() {
        return {
            total: this._totalScore,
            pairs: this._pairs,
        }
    }
    public get printCounts() {
        return {
            total: this._totalScore,
            pairs: this._pairs.length,
            fifteens: this._fifteens.length,
        }
    }
}
