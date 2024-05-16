import type { APIRoute } from "astro";
import { Deck } from "../../lib/Deck";

export const GET: APIRoute = () => {
    const deck = new Deck();
    return new Response(deck.printCards());
}
