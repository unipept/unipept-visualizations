import { describe, it, expect } from "vitest";
import BarplotPreprocessor from "./../BarplotPreprocessor.js";
import { Bar } from "./../Bar.js";

describe("BarplotPreprocessor", () => {
    const preprocessor = new BarplotPreprocessor();

    function bars(): Bar[] {
        return [
            {
                label: "Sample 1",
                items: [
                    { label: "small", counts: 1 },
                    { label: "large", counts: 10 },
                    { label: "medium", counts: 5 },
                ]
            },
            {
                label: "Sample 2",
                items: [
                    { label: "medium", counts: 4 },
                    { label: "large", counts: 8 },
                    { label: "only here", counts: 3 },
                ]
            }
        ];
    }

    function itemsOf(bar: Bar): Record<string, number> {
        return Object.fromEntries(bar.items.map(item => [item.label, item.counts]));
    }

    describe("computeMaxItemsInBars", () => {
        it("should keep the largest categories of the first bar and group the rest as Other", () => {
            const [first] = preprocessor.computeMaxItemsInBars(bars(), 2);

            expect(first.items.map(item => item.label)).toEqual(["large", "medium", "Other"]);
            // "small" is the category that did not make the cut.
            expect(itemsOf(first).Other).toEqual(1);
        });

        it("should order the other bars by the first bar rather than by their own size", () => {
            const [, second] = preprocessor.computeMaxItemsInBars(bars(), 2);

            // On its own, "large" (8) outranks "medium" (4), but the first bar
            // decides the order so that the stacks line up across samples.
            expect(second.items.map(item => item.label)).toEqual(["large", "medium", "Other"]);
        });

        it("should move categories absent from the first bar into Other", () => {
            const [, second] = preprocessor.computeMaxItemsInBars(bars(), 2);

            expect(second.items.map(item => item.label)).not.toContain("only here");
            expect(itemsOf(second).Other).toEqual(3);
        });

        it("should keep every category when maxItems is undefined", () => {
            const [first] = preprocessor.computeMaxItemsInBars(bars(), undefined);

            expect(first.items.map(item => item.label)).toEqual(["large", "medium", "small", "Other"]);
            expect(itemsOf(first).Other).toEqual(0);
        });

        it("should leave the caller's bars untouched", () => {
            const input = bars();
            const before = JSON.stringify(input);

            preprocessor.computeMaxItemsInBars(input, 1);

            expect(JSON.stringify(input)).toEqual(before);
        });

        it("should leave Other out entirely when no bar bins anything into it", () => {
            const complete: Bar[] = [
                { label: "Sample 1", items: [{ label: "a", counts: 1 }, { label: "b", counts: 2 }] },
                { label: "Sample 2", items: [{ label: "a", counts: 3 }, { label: "b", counts: 4 }] }
            ];

            for (const bar of preprocessor.computeMaxItemsInBars(complete, undefined)) {
                expect(bar.items.map(item => item.label)).toEqual(["b", "a"]);
            }
        });

        it("should add Other to every bar as soon as one of them needs it", () => {
            // Only the second bar has a category the first does not, but the
            // bars are drawn as aligned stacks, so both have to carry "Other".
            const output = preprocessor.computeMaxItemsInBars(bars(), undefined);

            expect(output.map(bar => bar.items.at(-1)!.label)).toEqual(["Other", "Other"]);
            expect(itemsOf(output[0]).Other).toEqual(0);
            expect(itemsOf(output[1]).Other).toEqual(3);
        });

        it("should keep every bar", () => {
            const output = preprocessor.computeMaxItemsInBars(bars(), 1);

            expect(output.map(bar => bar.label)).toEqual(["Sample 1", "Sample 2"]);
        });
    });

    describe("convertAbsoluteToRelative", () => {
        it("should turn counts into percentages of their own bar", () => {
            const [first, second] = preprocessor.convertAbsoluteToRelative(bars());

            expect(itemsOf(first).large).toBeCloseTo(62.5);
            expect(itemsOf(first).medium).toBeCloseTo(31.25);
            expect(itemsOf(first).small).toBeCloseTo(6.25);

            // Each bar is scaled against its own total, not a shared one.
            expect(itemsOf(second).large).toBeCloseTo(53.333, 2);
        });

        it("should make every bar add up to a hundred", () => {
            for (const bar of preprocessor.convertAbsoluteToRelative(bars())) {
                const total = bar.items.reduce((sum, item) => sum + item.counts, 0);
                expect(total).toBeCloseTo(100);
            }
        });

        it("should return zeroes rather than dividing by zero for an empty bar", () => {
            const empty: Bar[] = [{
                label: "Sample 1",
                items: [{ label: "a", counts: 0 }, { label: "b", counts: 0 }]
            }];

            const [bar] = preprocessor.convertAbsoluteToRelative(empty);

            expect(bar.items.map(item => item.counts)).toEqual([0, 0]);
        });

        it("should leave the caller's bars untouched", () => {
            const input = bars();
            const before = JSON.stringify(input);

            preprocessor.convertAbsoluteToRelative(input);

            expect(JSON.stringify(input)).toEqual(before);
        });
    });
});
