import type { APIRoute } from "astro";
import { parseCardsQuery } from "../../utils/parseCardsQuery";
import type { Card } from "../../lib/Card";
import { getCombinations } from "../../utils/getCombinations";
import { scoreHand } from "../../lib/scoreHand";

export const GET: APIRoute = (context) => {
  console.time("handsStats");
  const url = new URL(context.url);
  const cards = url.searchParams.get("cards");
  const detail = url.searchParams.get("detail")?.split(",");
  const sort = url.searchParams.get("sort");

  if (!cards) {
    return new Response("No cards provided", { status: 400 });
  }

  // Parse Query Params
  let parsedCards: Card[];
  try {
    parsedCards = parseCardsQuery(cards);
  } catch (err) {
    return new Response("Error parsing cards" + err, { status: 400 });
  }

  if (parsedCards.length > 6) {
    return new Response("Hand size is limited to 6", { status: 400 });
  }

  if (parsedCards.length === 4) {
    return new Response(JSON.stringify(scoreHand(parsedCards), null, 2));
  }

  const collectedResults: {
    keep: string[];
    discard: string[];
    result: {
      mean: number;
      scoringOptions: { [key: number]: { flips?: string[] } };
    };
  }[] = [];

  // Get 4-card combinations
  const combos = getCombinations(parsedCards, 4);
  for (let combo of combos) {
    const discard = parsedCards.filter((c) => !combo.includes(c));

    collectedResults.push({
      keep: combo.map((c) => c.printReadableStr()),
      discard: discard.map((c) => c.printReadableStr()),
      result: scoreHand(combo, discard),
    });
  }

  let result = collectedResults.sort((a, b) => {
    if (sort && b.result[sort] !== undefined && a.result[sort] !== undefined) {
      return b.result[sort] - a.result[sort];
    }
    return b.result.mean - a.result.mean;
  });

  if (!detail?.includes("all")) {
    result = [result[0]];
  }

  if (!detail?.includes("flips")) {
    result.forEach((el) => {
      for (let opt in el.result.scoringOptions) {
        delete el.result.scoringOptions[opt].flips;
      }
    });
  }

  console.timeEnd("handsStats");
  return new Response(JSON.stringify(result, null, 2));
};
