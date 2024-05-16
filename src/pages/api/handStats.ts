import type { APIRoute } from "astro";
import { Deck } from "../../lib/Deck";
import { parseCardsQuery } from "../../utils/parseCardsQuery";
import type { Card } from "../../lib/Card";

export const GET: APIRoute = (context) => {
    const url = new URL(context.url)
    const cards = url.searchParams.get("cards");

    if (!cards) {
        return new Response("No cards provided", { status: 400 })
    }

    let parsedCards: Card[];
    try {
        parsedCards = parseCardsQuery(cards);
    } catch (err) {
        return new Response("Error parsing cards" + err, { status: 400 })
    }

    console.log(parsedCards);
    const deck = new Deck();

    // Remove Provided cards from deck
    parsedCards.forEach(({ rank, suit }) => deck.removeCard(rank, suit))

    deck.shuffle();

    return new Response(JSON.stringify(deck.view()));
}
