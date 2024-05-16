import type { APIRoute } from "astro";
import { Deck } from "../../lib/Deck";

export const GET: APIRoute = (context) => {
    const url = new URL(context.url)
    const count = Number(url.searchParams.get("count")) || 1;

    const deck = new Deck();
    deck.shuffle();

    const removed = deck.draw(count).map(card => card.print());
    return new Response(JSON.stringify(removed, null, 2));
}
