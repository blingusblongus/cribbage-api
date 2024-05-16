import { getCombinations } from "../utils/getCombinations";
import type { Card } from "./Card";

export class Hand {
    private _cards: Card[];
    private _pairs: Card[][] = [];
    private _fifteens: Card[][] = [];
    private _totalScore: number = 0;

    constructor(cards: Card[]) {
        if (cards.length > 5) {
            throw Error("Invalid hand: max 5 cards");
        }
        this._cards = cards;
        this._totalScore = this.scorePairs();
        this._totalScore += this.scoreFifteens();
    }

    private scorePairs() {
        let numPairs = 0;
        for (let [c1, c2] of getCombinations(this._cards, 2)) {
            if (c1.rank === c2.rank) {
                numPairs++;
                this._pairs.push([c1, c2]);
            }
        }
        return numPairs * 2;
    }

    // TODO: This can be improved by exiting early if over 15
    private scoreFifteens() {
        let numFifteens = 0;
        for (let size = 2; size < 6; ++size) {
            for (let set of getCombinations(this._cards, size)) {
                const sum = set.reduce((sum, el) => sum += el.count(), 0);
                if (sum === 15) {
                    this._fifteens.push(set);
                    numFifteens++;
                }
            }
        }
        return numFifteens * 2;
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
        }
    }

    public get cards() {
        return this._cards;
    }
}
