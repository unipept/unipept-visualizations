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
    /**
     * Change the root of the visualization to the node with a given ID. Note that the reroot will only be executed if
     * a node with the given ID exists. If no node was found, nothing happens.
     *
     * @param nodeId ID of the node that should now become the new root of the tree.
     * @param triggerCallback Should the `rerootCallback` be triggered for this node?
     */
    reroot(nodeId: number, triggerCallback?: boolean): void;
    private fillOptions;
    private initCss;
    private render;
    private setBreadcrumbs;
    private tooltipIn;
    private tooltipMove;
    private tooltipOut;
}
