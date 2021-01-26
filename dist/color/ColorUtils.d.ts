export default class ColorUtils {
    static getReadableColorFor(color: string): string;
    static brightness({ r, g, b }: {
        r: number;
        g: number;
        b: number;
    }): number;
}
