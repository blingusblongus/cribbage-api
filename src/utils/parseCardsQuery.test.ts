import { describe, expect, test } from "vitest";
import { parseCardsQuery } from "./parseCardsQuery";
import { Rank, Suit } from "../types/cardTypes";

describe("parseCardsQuery", () => {
    test("Ace of Spades", () => {
        const card = parseCardsQuery("as")[0];
        expect(card.rank == Rank.Ace).is.true;
        expect(card.suit == Suit.Spades).is.true;
    })
    test("Queen of Hearts", () => {
        const card = parseCardsQuery("qh")[0];
        expect(card.rank == Rank.Queen).is.true;
        expect(card.suit == Suit.Hearts).is.true;
    })
})
