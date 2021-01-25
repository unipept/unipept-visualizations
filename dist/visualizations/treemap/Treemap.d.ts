import TreemapSettings from "./TreemapSettings";
import DataNode from "./../../DataNode";
export default class Treemap {
    private element;
    private readonly settings;
    private readonly data;
    private currentRoot;
    private tooltip;
    private breadCrumbs;
    private treemap;
    private colorScale;
    constructor(element: HTMLElement, data: DataNode, options?: TreemapSettings);
    private fillOptions;
    private initCss;
    private render;
    private setBreadcrumbs;
    private tooltipIn;
    private tooltipMove;
    private tooltipOut;
}
