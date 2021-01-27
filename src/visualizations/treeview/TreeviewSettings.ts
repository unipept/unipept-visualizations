import { scaleOrdinal, schemeCategory10, HierarchyPointLink } from "d3";

import Settings from "./../../Settings";
import TreeviewNode from "./TreeviewNode";

export default class TreeviewSettings extends Settings {
    minNodeSize: number = 2;
    maxNodeSize: number = 105;

    enableExpandOnClick: boolean = true;
    enableAutoExpand: boolean = false;
    autoExpandValue: number = 0.8;
    levelsToExpand: number = 2;

    enableInnerArcs: boolean = true;
    enableLabels: boolean = true;

    nodeDistance: number = 180;

    animationDuration: number = 1000;

    nodeFillColor: (d: TreeviewNode) => string = (d: TreeviewNode) => {
        if (d.isSelected()) {
            return d.children.length > 0 ? d.getColor() || "#aaa" : "#fff";
        } else {
            return "#aaa";
        }
    }

    nodeStrokeColor: (d: TreeviewNode) => string =
        (d: TreeviewNode) => d.isSelected() ? (d.getColor() || "#aaa") : "#aaa";

    linkStrokeColor: (d: HierarchyPointLink<TreeviewNode>) => string =
        (d: HierarchyPointLink<TreeviewNode>) => d.source.data.isSelected() ? d.target.data.getColor() : "#aaa";

    colorProvider: (d: TreeviewNode) => string = (d: TreeviewNode) => scaleOrdinal(schemeCategory10)(d.name);

    getLabel: (d: TreeviewNode) => string = (d: TreeviewNode) => d.name;
}
