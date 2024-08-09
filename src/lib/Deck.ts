import { Rank, Suit } from "../types/cardTypes";
import { Card } from "./Card";

export class Deck {
  private _cards: Card[] = [];
  private _removed: Card[] = [];

  public get cards() {
    return this._cards;
  }

  constructor() {
    this.seedDeck();
  }

  private seedDeck() {
    for (let suit in Suit) {
      if (isNaN(Number(suit))) {
        // filter out numeric keys
        for (let rank in Rank) {
          if (isNaN(Number(rank))) {
            // filter out numeric keys
            let card = new Card(
              Rank[rank as keyof typeof Rank],
              Suit[suit as keyof typeof Suit],
            );
            this._cards.push(card);
          }
        }
      }
    }
  }

  public view() {
    const cards = this._cards.map((card) => card.print());
    const removedCards = this._removed.map((card) => card.print());
    const deck = {
      numCards: this._cards.length,
      cards,
      removedCards,
    };
    return deck;
  }

  public shuffle() {
    // Fisher Yates
    for (let i = this._cards.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }
  }

  public removeCard(rank: Rank, suit: Suit) {
    const idxToRemove = this._cards.findIndex(
      (card) => card.suit === suit && card.rank === rank,
    );
    this._removed.push(this._cards.splice(idxToRemove, 1)[0]);
  }

  // TODO: Eventually, this may need to become `drawToHand` or `drawToDiscard`
  public draw(num: number = 1): Card[] {
    const drawnCards = this._cards.splice(0, num);
    this._removed = this._removed.concat(...drawnCards);

    return drawnCards;
  }
}
