import TreeviewSettings from "./TreeviewSettings";
import { DataNodeLike } from "./../../DataNode";
export default class Treeview {
    private readonly element;
    private readonly settings;
    private readonly data;
    private root;
    private nodeId;
    private widthScale;
    private treeLayout;
    private visElement;
    private tooltip;
    private zoomListener;
    private tooltipTimer;
    private zoomScale;
    private svg;
    constructor(element: HTMLElement, data: DataNodeLike, options?: TreeviewSettings);
    reset(): void;
    private fillOptions;
    private render;
    private centerRoot;
    private initialExpand;
    private update;
    private computeNodeSize;
    private click;
    private tooltipIn;
    private tooltipOut;
    private rightClick;
}
