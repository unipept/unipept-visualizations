export default class StringUtils {
    /**
     * Hash function for strings from http://stackoverflow.com/a/15710692/865696
     */
    static stringHash(s: string): number {
        return s.split("").reduce(function (a, b) {
            let c = ((a << 5) - a) + b.charCodeAt(0);
            return c & c;
        }, 0);
    }
}
