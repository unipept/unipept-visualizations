import DataNode from "./../../DataNode";

export default class TreeviewNode extends DataNode {
    private selected: boolean = false;
    private expandedChildren: Set<TreeviewNode> = new Set<TreeviewNode>();
    private color: string = "";

    public isExpanded(): boolean {
        return this.expandedChildren.has(this);
    }

    public isSelected(): boolean {
        return this.selected;
    }

    public getColor(): string {
        return this.color;
    }

    /**
     * Mark this node and all of it's children as (de)selected.
     *
     * @param value True if the node should be marked as selected, false otherwise.
     */
    public setSelected(value: boolean) {
        this.selected = value;
        for (const child of this.children) {
            (child as TreeviewNode).setSelected(value);
        }
    }

    /**
     * Collapse this node and all of it's children recursively.
     */
    public collapseAll(): void {
        for (const child of (this.children as TreeviewNode[])) {
            this.expandedChildren.delete(child);
            child.collapseAll();
        }
    }

    /**
     * Collapse this node.
     */
    public collapse(): void {
        for (const child of (this.children as TreeviewNode[])) {
            this.expandedChildren.delete(child);
        }
    }

    /**
     * Expand this node and all of it's children recursively.
     */
    public expandAll(): void {
        this.expand(100);
    }

    /**
     * Expand this node and all children that are maximum i levels deeper than the current node.
     *
     * @param i Maximum amount of levels deeper at which nodes will be expanded.
     */
    public expand(i: number): void {
        if (i > 0) {
            if (this.children.length > 0) {
                for (const child of (this.children as TreeviewNode[])) {
                    this.expandedChildren.add(child);
                    child.expand(i - 1);
                }
            }
        }
    }

    /**
     * Recursively sets the color of this node and all of it's children to the provided value.
     *
     * @param color HTML hex string that represents a valid color.
     */
    public setColor(color: string): void {
        this.color = color;
        for (const child of (this.children as TreeviewNode[])) {
            child.setColor(color);
        }
    }
}
