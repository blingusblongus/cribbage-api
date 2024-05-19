import { describe, expect, test } from "vitest"
import { parseCardsQuery } from "../utils/parseCardsQuery"
import { Hand } from "./Hand";

const handHelper = (handStr: string, flipStr: string) => {
    const handCards = parseCardsQuery(handStr)
    const flipCard = parseCardsQuery(flipStr)[0]
    return new Hand(handCards, flipCard);
}

describe("Hand Scoring", () => {
    describe("Nibs", () => {
        test("Nibs is true", () => {
            const hand = handHelper("ah,as,3h,6h", "jh")
            expect(hand.nibs).toBe(true);
        })
        test("Nibs is false", () => {
            const hand = handHelper("ah,jh,3h,6h", "10h")
            expect(hand.nibs).toBe(false);
        })
    })

    describe("Nobs", () => {
        test("Nobs is true", () => {
            const hand = handHelper("ah,as,3h,jh", "6h")
            expect(hand.nobs).toBe(true);
        })
        test("Nobs is false", () => {
            const hand = handHelper("ah,as,3h,jh", "6s")
            expect(hand.nobs).toBe(false);
        })
    })

    describe("Fifteens", () => {
        test("1 instance: ah,as,3h,6h,jh", () => {
            const hand = handHelper("ah,as,3h,6h", "jh")
            expect(hand.fifteens.length).toBe(1);
        })
        test("2 instances: ah,as,4h,6h,jh", () => {
            const hand = handHelper("ah,as,4h,6h", "jh")
            expect(hand.fifteens.length).toBe(2);
        })
        test("3 instances", () => {
            const hand = handHelper("10h,10s,10c,6h", "5h")
            expect(hand.fifteens.length).toBe(3);
        })
    })

    describe("Pairs", () => {
        test("1 pair", () => {
            const hand = handHelper("10h,10s,3c,6h", "5h")
            expect(hand.pairs.length).toBe(1);
        })
        test("2 pair", () => {
            const hand = handHelper("10h,10s,3c,6h", "3h")
            expect(hand.pairs.length).toBe(2);
        })
        test("trips", () => {
            const hand = handHelper("10h,10s,10c,6h", "3h")
            expect(hand.pairs.length).toBe(3);
        })
    })

    describe("Flush", () => {
        test("4-card flush", () => {
            const hand = handHelper("ah,3h,5h,6h", "8s")
            expect(hand.flushPoints).toBe(4);
        })
        test("5-card flush", () => {
            const hand = handHelper("ah,3h,5h,6h", "8h")
            expect(hand.flushPoints).toBe(5);
        })
        test("no flush", () => {
            const hand = handHelper("as,3h,5h,6h", "8h")
            expect(hand.flushPoints).toBe(0);
        })
    })

    describe("Combined", () => {
        test("trips + three 15s = 12", () => {
            const hand = handHelper("10h,10s,10c,6h", "5h")
            expect(hand.totalScore).toBe(12);
        })
        test("two pair + nibs = 6", () => {
            const hand = handHelper("10h,js,10c,6h", "jh")
            expect(hand.totalScore).toBe(6);
        })
        test("two 15s + pair + 4-card flush = 8", () => {
            const hand = handHelper("10h,3h,2h,6h", "10s")
            expect(hand.totalScore).toBe(10);
        })
    })
})
