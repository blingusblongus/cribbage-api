import type { APIRoute } from "astro";
import { Deck } from "../../lib/Deck";
import { parseCardsQuery } from "../../utils/parseCardsQuery";
import type { Card } from "../../lib/Card";
import { getCombinations } from "../../utils/getCombinations";
import { Hand } from "../../lib/Hand";

export const GET: APIRoute = (context) => {
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
    const scoredHands: { [key: number]: number } = {};
    for (let combo of combos) {
        // Add each potential flip card
        for (let i = 0; i < deck.cards.length; ++i) {
            const withFlip = [...combo, deck.cards[i]];
            const hand = new Hand(withFlip);

            const score = hand.printCounts.total;
            if (scoredHands[score]) {
                scoredHands[score]++
            } else {
                scoredHands[score] = 1;
            }
        }
    }

    return new Response(JSON.stringify(scoredHands, null, 2))
    // return new Response(JSON.stringify(scoredHands, null, 2))


    return new Response(JSON.stringify(deck.view()));
}
