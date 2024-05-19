import type { APIRoute } from "astro";
import { parseCardsQuery } from "../../utils/parseCardsQuery";
import type { Card } from "../../lib/Card";
import { getCombinations } from "../../utils/getCombinations";
import { scoreHand } from "../../lib/scoreHand";

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

    if (parsedCards.length === 4) {
        return new Response(JSON.stringify(scoreHand(parsedCards), null, 2))
    }

    const collectedResults = [];

    // Get 4-card combinations
    const combos = getCombinations(parsedCards, 4);
    for (let combo of combos) {
        collectedResults.push({
            keep: combo.map(c => c.printReadableStr()),
            discard: parsedCards.filter(c => !combo.includes(c)).map(c => c.printReadableStr()),
            result: scoreHand(combo),
        });
    }

    const result = collectedResults.sort((a, b) => b.result.mean - a.result.mean)

    console.timeEnd("handsStats");
    return new Response(JSON.stringify(result, null, 2))
}
