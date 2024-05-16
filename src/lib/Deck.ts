import { Rank, Suit } from "../types/cardTypes";
import { getEnumKeyByValue } from "../utils/getEnumKeyByValue";
import { Card } from "./Card";

export class Deck {
    private _cards: Card[] = [];

    constructor() {
        this.seedDeck();
    }

    private seedDeck() {
        for (let suit in Suit) {
            if (isNaN(Number(suit))) { // filter out numeric keys
                for (let rank in Rank) {
                    if (isNaN(Number(rank))) { // filter out numeric keys
                        let card = new Card(
                            Rank[rank as keyof typeof Rank],
                            Suit[suit as keyof typeof Suit]
                        );
                        this._cards.push(card);
                    }
                }
            }
        }
    }

    public printCards() {
        const cards = this._cards.map((card) => {
            return {
                rank: getEnumKeyByValue(Rank, card.rank),
                suit: getEnumKeyByValue(Suit, card.suit),
                count: card.count(),
            }
        })

        const deck = {
            numCards: this._cards.length,
            cards,
        }
        return JSON.stringify(deck, null, 2);
    }

    public shuffle() {
        // Fisher Yates
        for (let i = this._cards.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
        }
    }

    public removeCard(rank: Rank, suit: Suit) {
        this._cards = this._cards.filter((card) => {
            return card.suit !== suit || card.rank !== rank;
        })
    }
}
