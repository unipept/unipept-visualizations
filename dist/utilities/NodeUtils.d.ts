import { default as DataNode } from './../DataNode';
import * as d3 from "d3";
export default class NodeUtils {
    /**
     * Checks if p is a parent of c. If the child is situated deeper in the hierarchy than maxLevels, false is returned.
     *
     * @param p Possible parent node.
     * @param c Possible child node.
     * @param maxLevels Maximum depth for the child node in the hierarchy.
     */
    static isParentOf(p: d3.HierarchyRectangularNode<DataNode>, c: d3.HierarchyRectangularNode<DataNode>, maxLevels: number): boolean;
}
