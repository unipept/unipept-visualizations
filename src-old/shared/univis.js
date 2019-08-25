export default class Univis {

    /**
     * Hash function for strings from
     * http://stackoverflow.com/a/15710692/865696
     */
    static stringHash(s) {
        return s.split("").reduce(function (a, b) {
            let c = ((a << 5) - a) + b.charCodeAt(0);
            return c & c;
        }, 0);
    }

    /*
     * Returns the readable text color based on the brightness of a given backgroud color
     */
    static getReadableColorFor(color) {
        let textColor = "#000";
        try {
            textColor = Univis.brightness(d3.rgb(color)) < 125 ? "#eee" : "#000";
        } catch (err) { /* go on */ }
        return textColor;
    }

    /*
     * Returns the brightness of an rgb-color
     * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
     */
    static brightness(rgb) {
        return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
    }

    static getTooltipTitle(d) {
        return d.name;
    }

    static getTooltipText(d) {
        return `${d.data.count} hits`;
    }
}
