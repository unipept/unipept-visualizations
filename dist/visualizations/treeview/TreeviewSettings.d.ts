import { HierarchyPointLink } from "d3";
import Settings from "./../../Settings";
import TreeviewNode from "./TreeviewNode";
export default class TreeviewSettings extends Settings {
    minNodeSize: number;
    maxNodeSize: number;
    enableExpandOnClick: boolean;
    enableAutoExpand: boolean;
    autoExpandValue: number;
    levelsToExpand: number;
    enableInnerArcs: boolean;
    enableLabels: boolean;
    nodeDistance: number;
    animationDuration: number;
    nodeFillColor: (d: TreeviewNode) => string;
    nodeStrokeColor: (d: TreeviewNode) => string;
    linkStrokeColor: (d: HierarchyPointLink<TreeviewNode>) => string;
    colorProvider: (d: TreeviewNode) => string;
    getLabel: (d: TreeviewNode) => string;
}
