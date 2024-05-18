import { describe, expect, test } from "vitest"
import { parseCardsQuery } from "../utils/parseCardsQuery"
import { Hand } from "./Hand";

describe("Hand Scoring", () => {
    describe("Pairs", () => {
        // test("Scores one pair", () => {
        //     let hand = new Hand(parseCardsQuery("ah,as,3h,4h,jh"));
        //     expect(hand.printCounts.pairs).toBe(1)
        // })
        // test("Scores trips", () => {
        //     let hand = new Hand(parseCardsQuery("ah,as,ac,4h,jh"));
        //     expect(hand.printCounts.pairs).toBe(3)
        // })
        // test("Scores quads", () => {
        //     let hand = new Hand(parseCardsQuery("ah,as,ac,ad,jh"));
        //     expect(hand.printCounts.pairs).toBe(6)
        // })
    })

    describe("Nibs", () => {
        test("Nibs is true", () => {
            const handCards = parseCardsQuery("ah,as,3h,6h")
            const flipCard = parseCardsQuery("jh")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.nibs).toBe(true);
        })
        test("Nibs is false", () => {
            const handCards = parseCardsQuery("ah,jh,3h,6h")
            const flipCard = parseCardsQuery("10h")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.nibs).toBe(false);
        })
    })

    describe("Nobs", () => {
        test("Nobs is true", () => {
            const handCards = parseCardsQuery("ah,as,3h,jh")
            const flipCard = parseCardsQuery("6h")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.nobs).toBe(true);
        })
        test("Nobs is false", () => {
            const handCards = parseCardsQuery("ah,as,3h,jh")
            const flipCard = parseCardsQuery("6s")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.nobs).toBe(false);
        })
    })

    describe("Fifteens", () => {
        test("1 instance: ah,as,3h,6h,jh", () => {
            const handCards = parseCardsQuery("ah,as,3h,6h")
            const flipCard = parseCardsQuery("jh")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.fifteens.length).toBe(1);
        })
        test("2 instances: ah,as,4h,6h,jh", () => {
            const handCards = parseCardsQuery("ah,as,4h,6h")
            const flipCard = parseCardsQuery("jh")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.fifteens.length).toBe(2);
        })
    })
})
