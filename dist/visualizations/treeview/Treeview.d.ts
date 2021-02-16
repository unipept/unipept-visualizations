import TreeviewSettings from "./TreeviewSettings";
import TreeviewNode from "./TreeviewNode";
export default class Treeview {
    private readonly element;
    private readonly settings;
    private readonly data;
    private root;
    private nodeId;
    private widthScale;
    private treeLayout;
    private visElement;
    private zoomListener;
    private zoomScale;
    private svg;
    constructor(element: HTMLElement, data: TreeviewNode, options?: TreeviewSettings);
    private fillOptions;
    private render;
    private centerRoot;
    private initialExpand;
    private update;
    private computeNodeSize;
    private click;
}
