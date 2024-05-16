import { describe, expect, test } from "vitest"
import { parseCardsQuery } from "../utils/parseCardsQuery"
import { Hand } from "./Hand";

describe("Hand Pairs", () => {
    test("Scores one pair", () => {
        let hand = new Hand(parseCardsQuery("ah,as,3h,4h,jh"));
        expect(hand.printCounts.pairs).toBe(1)
    })
    test("Scores trips", () => {
        let hand = new Hand(parseCardsQuery("ah,as,ac,4h,jh"));
        expect(hand.printCounts.pairs).toBe(3)
    })
    test("Scores quads", () => {
        let hand = new Hand(parseCardsQuery("ah,as,ac,ad,jh"));
        expect(hand.printCounts.pairs).toBe(6)
    })
})
