import Bar from "./Bar";

export default class BarCollection {
    constructor(
        public readonly itemNames: string[],
        public readonly bars: Bar[]
    ) {}
}
