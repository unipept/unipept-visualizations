import { Transition } from "./../Transition";

describe("easeInEaseOutCubic", () => {
    /**
     * We need to make sure that the transition moves equally fast at the beginning and at the end.
     */
    it("should speed up symmetrically", () => {
        const xLeft1 = Transition.easeInEaseOutCubic(0.1);
        const xLeft2 = Transition.easeInEaseOutCubic(0.2);
        const xRight1 = Transition.easeInEaseOutCubic(0.8);
        const xRight2 = Transition.easeInEaseOutCubic(0.9)

        expect(Math.abs(xLeft2 - xLeft1)).toBeCloseTo(Math.abs(xRight2 - xRight1));
    });

    /**
     * The transition should reach maximum speed near the center.
     */
    it("should speed up to the center", () => {
        const x1 = Transition.easeInEaseOutCubic(0.1);
        const x2 = Transition.easeInEaseOutCubic(0.2);

        const x3 = Transition.easeInEaseOutCubic(0.4);
        const x4 = Transition.easeInEaseOutCubic(0.5);

        expect(x4 - x3).toBeGreaterThan(x2 - x1);
    });

    it("should always return a value in the [0, 1] interval", () => {
        for (let t = 0; t <= 1; t += 0.1) {
            const transitionResult = Transition.easeInEaseOutCubic(t);
            expect(transitionResult).toBeGreaterThanOrEqual(0);
            expect(transitionResult).toBeLessThanOrEqual(1);
        }
    });
});

describe("easeInCubic", () => {
    it("should keep speeding up", () => {
        let previousValue = 0;
        let previousDifference = 0;
        for (let t = 0.5; t <= 1; t += 0.5) {
            const newValue = Transition.easeInCubic(t);
            expect(newValue - previousValue).toBeGreaterThan(previousDifference);
            previousDifference = newValue - previousValue;
            previousValue = newValue;
        }
    });

    it("should always return a value in the [0, 1] interval", () => {
        for (let t = 0; t <= 1; t += 0.1) {
            const transitionResult = Transition.easeInCubic(t);
            expect(transitionResult).toBeGreaterThanOrEqual(0);
            expect(transitionResult).toBeLessThanOrEqual(1);
        }
    });
});

describe("easeOutCubic", () => {
    it("should keep slowing down", () => {
        let previousValue = 0;
        let previousDifference = 1;
        for (let t = 0.5; t <= 1; t += 0.5) {
            const newValue = Transition.easeOutCubic(t);
            expect(newValue - previousValue).toBeLessThan(previousDifference);
            previousDifference = newValue - previousValue;
            previousValue = newValue;
        }
    });

    it("should always return a value in the [0, 1] interval", () => {
        for (let t = 0; t <= 1; t += 0.1) {
            const transitionResult = Transition.easeOutCubic(t);
            expect(transitionResult).toBeGreaterThanOrEqual(0);
            expect(transitionResult).toBeLessThanOrEqual(1);
        }
    });
});

describe("easeInEaseOutElastic", () => {
    it("should speed up symmetrically", () => {
        const xLeft1 = Transition.easeInEaseOutElastic(0.1);
        const xLeft2 = Transition.easeInEaseOutElastic(0.2);
        const xRight1 = Transition.easeInEaseOutElastic(0.8);
        const xRight2 = Transition.easeInEaseOutElastic(0.9)

        expect(Math.abs(xLeft2 - xLeft1)).toBeCloseTo(Math.abs(xRight2 - xRight1));
    });
});

describe("easeInElastic", () => {
    it("should keep speeding up", () => {
        let previousValue = 0;
        let previousDifference = 0;
        for (let t = 0.5; t <= 1; t += 0.5) {
            const newValue = Transition.easeInElastic(t);
            expect(Math.abs(newValue - previousValue)).toBeGreaterThan(previousDifference);
            previousDifference = newValue - previousValue;
            previousValue = newValue;
        }
    });
});

describe("easeOutElastic", () => {
    it("should keep slowing down", () => {
        let previousValue = 0;
        let previousDifference = Infinity;
        for (let t = 0.5; t <= 1; t += 0.5) {
            const newValue = Transition.easeOutElastic(t);
            expect(Math.abs(newValue - previousValue)).toBeLessThan(previousDifference);
            previousDifference = newValue - previousValue;
            previousValue = newValue;
        }
    });
})
