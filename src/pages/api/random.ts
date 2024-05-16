import type { APIRoute } from "astro";
import { Deck } from "../../lib/Deck";
import { Rank, Suit } from "../../types/cardTypes";

export const GET: APIRoute = () => {
    const deck = new Deck();
    // deck.shuffle();
    deck.removeCard(Rank["Ace"], Suit["Spades"])
    return new Response(JSON.stringify(deck.view()));
}
