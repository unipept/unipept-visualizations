import { BarplotSettings } from './BarplotSettings';
import { Bar } from './Bar';

export default class Barplot {
    private readonly element;
    private readonly settings;
    private readonly data;
    private tooltip;
    constructor(element: HTMLElement, data: Bar[], options?: BarplotSettings);
    private fillOptions;
    private renderBarplot;
    private tooltipIn;
    private tooltipMove;
    private tooltipOut;
}
