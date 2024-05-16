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

describe("Hand Fifteens", () => {
    test("Scores one fifteen", () => {
        let hand = new Hand(parseCardsQuery("ah,as,3h,6h,jh"));
        expect(hand.printCounts.fifteens).toBe(1)
    })
    test("Scores two fifteens", () => {
        let hand = new Hand(parseCardsQuery("ah,as,4h,6h,jh"));
        expect(hand.printCounts.fifteens).toBe(2)
    })
    test("Scores four fifteens", () => {
        let hand = new Hand(parseCardsQuery("7s,7h,8s,8s,jh"));
        expect(hand.printCounts.fifteens).toBe(4)
    })
})
