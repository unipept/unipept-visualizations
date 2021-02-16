export declare namespace Transition {
    /**
     * A transition that starts slowly, then accelerates and ends slowly again.
     * See: https://easings.net/#easeInOutCubic
     */
    function easeInEaseOutCubic(x: number): number;
    /**
     * A transition that starts slowly and then accelerates.
     * See: https://easings.net/#easeInCubic
     */
    function easeInCubic(x: number): number;
    /**
     * A transition that starts fast and then decelerates.
     * See: https://easings.net/#easeOutCubic
     */
    function easeOutCubic(x: number): number;
    /**
     * See: https://easings.net/#easeInOutElastic
     */
    function easeInEaseOutElastic(x: number): number;
    /**
     * See: https://easings.net/#easeInElastic
     */
    function easeInElastic(x: number): number;
    /**
     * https://easings.net/#easeOutElastic
     */
    function easeOutElastic(x: number): number;
}
