import { Card } from "./Card"
import { Deck } from "./Deck"
import { Hand } from "./Hand";

export const scoreHand = (cards: Card[]) => {
    // Init Deck
    const deck = new Deck();

    // Remove Provided cards from deck
    cards.forEach(({ rank, suit }) => deck.removeCard(rank, suit))

    // Check each combo (15x46 iterations)
    const scoredHands:
        { [key: number]: { count: number; chance: number; flips: string[] } } = {};

    // Add each potential flip card
    for (let i = 0; i < deck.cards.length; ++i) {
        const hand = new Hand(cards, deck.cards[i]);

        const score = hand.printCounts().total;
        if (scoredHands[score]) {
            scoredHands[score].count++,
                scoredHands[score].flips.push(deck.cards[i].printReadableStr())
            scoredHands[score].chance = (scoredHands[score].count / 48) * 100
        } else {
            scoredHands[score] = {
                count: 1,
                flips: [deck.cards[i].printReadableStr()],
                chance: 1 / 48,
            };
        }
    }
    const scores = Object.keys(scoredHands)
        .map(key => Number(key))
        .sort((a, b) => a - b);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const total = scores.reduce((sum, el) => sum += el, 0);
    const count = scores.length;
    const mean = total / count;

    const middle = Math.floor(scores.length / 2);
    const median = scores.length % 2 === 0 ? (scores[middle - 1] + scores[middle]) / 2 : scores[middle];

    const variance = scores.reduce((acc, score) => acc + (score - mean) ** 2, 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);

    return {
        max,
        min,
        mean,
        median,
        standardDeviation,
        scoringOptions: scoredHands,
    }
}
