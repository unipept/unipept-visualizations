import TreemapSettings from "./TreemapSettings";
import { DataNodeLike } from "./../../DataNode";
export default class Treemap {
    private element;
    private readonly settings;
    private readonly data;
    private readonly childParentRelations;
    private currentRoot;
    private tooltip;
    private breadCrumbs;
    private treemap;
    private colorScale;
    private partition;
    private nodeId;
    constructor(element: HTMLElement, data: DataNodeLike, options?: TreemapSettings);
    resize(newWidth: number, newHeight: number): void;
    reset(): void;
    private fillOptions;
    private initCss;
    private render;
    private setBreadcrumbs;
    private tooltipIn;
    private tooltipMove;
    private tooltipOut;
}
