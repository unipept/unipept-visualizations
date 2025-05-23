import { default as DataNode } from './../../DataNode';

export default class TreeviewNode extends DataNode {
    previousPosition: {
        x: number;
        y: number;
    };
    private selected;
    private collapsed;
    private color;
    isCollapsed(): boolean;
    setCollapsed(value: boolean): void;
    isSelected(): boolean;
    getColor(): string;
    /**
     * Mark this node and all of its children as (de)selected.
     *
     * @param value True if the node should be marked as selected, false otherwise.
     */
    setSelected(value: boolean): void;
    /**
     * Recursively collapse all children of this node.
     */
    collapseAll(): void;
    /**
     * Collapse this node.
     */
    collapse(): void;
    /**
     * Expand this node and all of its children recursively.
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
