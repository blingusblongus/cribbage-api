import { describe, expect, test } from "vitest"
import { parseCardsQuery } from "../utils/parseCardsQuery"
import { Hand } from "./Hand";

describe("Hand Scoring", () => {
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
        test("3 instances", () => {
            const handCards = parseCardsQuery("10h,10s,10c,6h")
            const flipCard = parseCardsQuery("5h")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.fifteens.length).toBe(3);
        })
    })

    describe("Pairs", () => {
        test("1 pair", () => {
            const handCards = parseCardsQuery("10h,10s,3c,6h")
            const flipCard = parseCardsQuery("5h")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.pairs.length).toBe(1);
        })
        test("2 pair", () => {
            const handCards = parseCardsQuery("10h,10s,3c,6h")
            const flipCard = parseCardsQuery("3h")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.pairs.length).toBe(2);
        })
        test("trips", () => {
            const handCards = parseCardsQuery("10h,10s,10c,6h")
            const flipCard = parseCardsQuery("3h")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.pairs.length).toBe(3);
        })
    })

    describe("Combined", () => {
        test("trips + three 15s = 12", () => {
            const handCards = parseCardsQuery("10h,10s,10c,6h")
            const flipCard = parseCardsQuery("5h")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.totalScore).toBe(12);
        })
        test("two pair + nibs = 6", () => {
            const handCards = parseCardsQuery("10h,js,10c,6h")
            const flipCard = parseCardsQuery("jh")[0]
            let hand = new Hand(handCards, flipCard);
            expect(hand.totalScore).toBe(6);
        })
    })
})
