import {BarplotSettings} from "./BarplotSettings";
import * as d3 from "d3";
import {Bar} from "./Bar";

export default class Barplot {
    private readonly settings: BarplotSettings;

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

    private visGElement: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;

    constructor(
        private readonly element: HTMLElement,
        data: Bar[],
        options: BarplotSettings = new BarplotSettings()
    ) {
        this.settings = this.fillOptions(options);
    }

    private fillOptions(options: any = undefined): BarplotSettings {
        const output = new BarplotSettings();
        return Object.assign(output, options);
    }
}
