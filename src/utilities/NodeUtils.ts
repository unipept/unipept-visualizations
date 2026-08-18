import * as d3 from "d3";

import DataNode from "./../DataNode";

export default class NodeUtils {
    /**
     * Checks if p is a parent of c. If the child is situated deeper in the hierarchy than maxLevels, false is returned.
     *
     * @param p Possible parent node.
     * @param c Possible child node.
     * @param maxLevels Maximum depth for the child node in the hierarchy.
     */
    public static isParentOf(
        p: d3.HierarchyRectangularNode<DataNode>,
        c: d3.HierarchyRectangularNode<DataNode>,
        maxLevels: number
    ): boolean {
        if (c.depth >= maxLevels) {
            return false;
        }

        let current: d3.HierarchyRectangularNode<DataNode> | null = c;
        while (current) {
            if (current === p) {
                return true;
            }
            current = current.parent;
        }

        return false;
    }
}
