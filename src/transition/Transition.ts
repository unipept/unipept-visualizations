export namespace Transition {
    /**
     * A transition that starts slowly, then accelerates and ends slowly again.
     * See: https://easings.net/#easeInOutCubic
     */
    export function easeInEaseOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    /**
     * A transition that starts slowly and then accelerates.
     * See: https://easings.net/#easeInCubic
     */
    export function easeInCubic(x: number): number {
        return x * x * x;
    }

    /**
     * A transition that starts fast and then decelerates.
     * See: https://easings.net/#easeOutCubic
     */
    export function easeOutCubic(x: number): number {
        return 1 - Math.pow(1 - x, 3);
    }

    /**
     * See: https://easings.net/#easeInOutElastic
     */
    export function easeInEaseOutElastic(x: number): number {
        const c5 = (2 * Math.PI) / 4.5;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }

    /**
     * See: https://easings.net/#easeInElastic
     */
    export function easeInElastic(x: number): number {
        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    }

    /**
     * https://easings.net/#easeOutElastic
     */
    export function easeOutElastic(x: number): number {
        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }
}
