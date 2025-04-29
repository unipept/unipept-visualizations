import {BarplotSettings} from "./BarplotSettings";
import * as d3 from "d3";
import {Bar} from "./Bar";
import BarplotPreprocessor from "./BarplotPreprocessor";

export default class Barplot {
    private readonly settings: BarplotSettings;
    private readonly data: Bar[];

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

    private visGElement: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;

    constructor(
        private readonly element: HTMLElement,
        data: Bar[],
        options: BarplotSettings = new BarplotSettings()
    ) {
        this.settings = this.fillOptions(options);

        const preprocessor = new BarplotPreprocessor();
        this.data = preprocessor.computeMaxItemsInBars(data, this.settings.maxItems);
    }

    private fillOptions(options: any = undefined): BarplotSettings {
        const output = new BarplotSettings();
        return Object.assign(output, options);
    }
}
