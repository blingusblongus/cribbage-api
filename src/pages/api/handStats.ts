import type { APIRoute } from "astro";
import { Deck } from "../../lib/Deck";
import { parseCardsQuery } from "../../utils/parseCardsQuery";
import type { Card } from "../../lib/Card";
import { getCombinations } from "../../utils/getCombinations";
import { Hand } from "../../lib/Hand";

export const GET: APIRoute = (context) => {
    console.time("handsStats");
    const url = new URL(context.url)
    const cards = url.searchParams.get("cards");

    if (!cards) {
        return new Response("No cards provided", { status: 400 })
    }

    // Parse Query Params
    let parsedCards: Card[];
    try {
        parsedCards = parseCardsQuery(cards);
    } catch (err) {
        return new Response("Error parsing cards" + err, { status: 400 })
    }

    if (parsedCards.length > 6) {
        return new Response("Hand size is limited to 6", { status: 400 })
    }
    // Init Deck
    const deck = new Deck();

    // Remove Provided cards from deck
    parsedCards.forEach(({ rank, suit }) => deck.removeCard(rank, suit))
    deck.shuffle();

    // Get 4-card combinations
    const combos = getCombinations(parsedCards, 4);

    // Check each combo (15x46 iterations)
    const scoredHands:
        { [key: number]: { count: number; chance: number; flips: { rank: string; suit: string; count: number; }[] } } = {};
    for (let combo of combos) {
        // Add each potential flip card
        for (let i = 0; i < deck.cards.length; ++i) {
            const hand = new Hand(combo, deck.cards[i]);

            const score = hand.printCounts().total;
            if (scoredHands[score]) {
                scoredHands[score].count++,
                    scoredHands[score].flips.push(deck.cards[i].print())
                scoredHands[score].chance = (scoredHands[score].count / 48) * 100
            } else {
                scoredHands[score] = {
                    count: 1,
                    flips: [deck.cards[i].print()],
                    chance: 1 / 48,
                };
            }
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

    const result = {
        max,
        min,
        mean,
        median,
        standardDeviation,
        scoringOptions: scoredHands,
    }

    console.timeEnd("handsStats");
    return new Response(JSON.stringify(result, null, 2))
}
