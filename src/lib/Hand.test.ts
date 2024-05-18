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

    describe("Fifteens", () => {
        test("1 instance: ah,as,3h,6h,jh", () => {
            let hand = new Hand(parseCardsQuery("ah,as,3h,6h,jh"));
            console.log(hand.fifteens)
            expect(hand.fifteens.length).toBe(1);
        })
        test("2 instances: ah,as,4h,6h,jh", () => {
            let hand = new Hand(parseCardsQuery("ah,as,4h,6h,jh"));
            console.log(hand.fifteens)
            expect(hand.fifteens.length).toBe(2);
        })
    })
})
