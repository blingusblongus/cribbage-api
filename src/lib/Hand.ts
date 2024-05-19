import { Rank } from "../types/cardTypes";
import { getCombinations } from "../utils/getCombinations";
import type { Card } from "./Card";

export class Hand {
    private _cards: Card[];
    private _pairs: Card[][] = [];
    private _fifteens: Card[][] = [];
    private _totalScore: number = 0;
    private _flipCard: Card;
    private _runs: Card[][] = [];

    private _nobs: boolean;
    private _flushPoints = 0;
    private _runPoints = 0;

    public get cards() { return this._cards };
    public get pairs() { return this._pairs };
    public get fifteens() { return this._fifteens };
    public get totalScore() { return this._totalScore };
    public get nobs() { return this._nobs };
    public get flushPoints() { return this._flushPoints };
    public get runPoints() { return this._runPoints };

    constructor(cards: Card[], flip: Card) {
        if (cards.length > 4) {
            throw Error("Invalid hand: max 4 hand cards");
        }
        this._cards = cards;
        this._flipCard = flip;

        this._nobs = !!this._cards.find(card => {
            return card.rank === Rank.Jack && card.suit === this._flipCard.suit
        });

        // Flush
        if (this._cards.filter(card => {
            return card.suit === this._cards[0].suit;
        }).length === 4) {
            this._flushPoints += 4;
        }

        // 5-card flush
        if (this._flushPoints === 4 &&
            (this._flipCard.suit === this._cards[0].suit)) {
            this._flushPoints += 1;
        }
        this.scoreHand();
    }

    private scoreHand() {
        // Check all combos of 2-5 cards
        for (let size = 5; size > 1; --size) {
            for (let set of getCombinations([...this._cards, this._flipCard], size)) {
                if (size > 1) {
                    // Check Fifteens
                    if (this.isFifteen(set)) this._fifteens.push(set);
                }
                if (size === 2) {
                    // Check Pairs
                    if (this.isPair(set)) this._pairs.push(set);
                }
                if (size >= 3) {
                    if (this.isDistinctRun(set)) this._runs.push(set);
                }
            }
        }

        // Nobs
        if (this._nobs) this._totalScore += 1;

        // Score fifteens/pairs
        this._totalScore += 2 * this._fifteens.length;
        this._totalScore += 2 * this._pairs.length;

        this._totalScore += this._flushPoints;

        this._runPoints += this._runs.reduce((sum, el) => sum += el.length, 0);
        this._totalScore += this._runPoints;
    }

    private isFifteen(combo: Card[]): boolean {
        let count = 0;
        for (let i = 0; i < combo.length; ++i) {
            count += combo[i].count();
            if (count > 15) return false;
        }
        return count === 15;
    }

    private isPair(combo: Card[]): boolean {
        if (combo.length !== 2) throw Error("isPair must accept two cards")
        return combo[0].rank === combo[1].rank;
    }

    private isRun(combo: Card[]): boolean {
        if (combo.length < 3) throw Error("isRun must accept 3 or more cards");

        const values = combo
            .map(card => card.rank)
            .sort((a, b) => a - b);

        for (let i = 0; i < values.length - 1; ++i) {
            if (values[i] + 1 !== values[i + 1]) return false;
        }
        return true;
    }

    private isDistinctRun(combo: Card[]): boolean {
        if (!this.isRun(combo)) return false;

        for (let run of this._runs) {
            for (let card of combo) {
                if (run.find(c => card.rank === c.rank && card.suit === c.suit)) {
                    return false;
                }
            }
        }
        return true;
    }

    public printFull() {
        return Object.freeze({
            totalScore: this._totalScore,
            cards: this._cards,
            flipCard: this._flipCard,
            total: this._totalScore,
            pairs: this._pairs,
            fifteens: this._fifteens,
            flushPoints: this._flushPoints,
            runs: this._runs,
            nobs: this._nobs,
        })
    }
    public printCounts() {
        return Object.freeze({
            total: this._totalScore,
            pairs: this._pairs.length,
            fifteens: this._fifteens.length,
        })
    }
}
