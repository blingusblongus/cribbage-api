import { Card } from "../lib/Card";
import { Rank, Suit } from "../types/cardTypes";

const suitMap: { [key: string]: Suit } = {
    H: Suit.Hearts,
    D: Suit.Diamonds,
    C: Suit.Clubs,
    S: Suit.Spades,
}
const rankMap: { [key: string]: Rank } = {
    A: Rank.Ace,
    2: Rank.Two,
    3: Rank.Three,
    4: Rank.Four,
    5: Rank.Five,
    6: Rank.Six,
    7: Rank.Seven,
    8: Rank.Eight,
    9: Rank.Nine,
    10: Rank.Ten,
    J: Rank.Jack,
    Q: Rank.Queen,
    K: Rank.King,
}
export const parseCardsQuery = (queryStr: string): Card[] => {
    const cardStrings = queryStr.trim().toUpperCase().split(',');

    const result: Card[] = [];
    for (let card of cardStrings) {
        let rank: Rank;
        let suit: Suit;
        if (card.length === 3) {
            rank = rankMap[card.substring(0, 2)];
            suit = suitMap[card[2]];
        } else if (card.length === 2) {
            rank = rankMap[card[0]];
            suit = suitMap[card[1]];
        } else {
            throw new Error("invalid cardString length");
        }

        if (rank === undefined || suit === undefined) {
            throw new Error(`Error parsing card: ${card}`)
        }

        result.push(new Card(rank, suit))
    }

    return result;
}
