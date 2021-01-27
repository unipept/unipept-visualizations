import DataNode from "./../../DataNode";
export default class TreeviewNode extends DataNode {
    private selected;
    private expandedChildren;
    private color;
    isExpanded(): boolean;
    isSelected(): boolean;
    getColor(): string;
    /**
     * Mark this node and all of it's children as (de)selected.
     *
     * @param value True if the node should be marked as selected, false otherwise.
     */
    setSelected(value: boolean): void;
    /**
     * Collapse this node and all of it's children recursively.
     */
    collapseAll(): void;
    /**
     * Collapse this node.
     */
    collapse(): void;
    /**
     * Expand this node and all of it's children recursively.
     */
    expandAll(): void;
    /**
     * Expand this node and all children that are maximum i levels deeper than the current node.
     *
     * @param i Maximum amount of levels deeper at which nodes will be expanded.
     */
    expand(i: number): void;
    /**
     * Recursively sets the color of this node and all of it's children to the provided value.
     *
     * @param color HTML hex string that represents a valid color.
     */
    setColor(color: string): void;
}
