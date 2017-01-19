import Node from "../shared/node";

export default class TreeviewNode extends Node {
    constructor(node = {}) {
        super(node);
        this.settings = TreeviewNode.settings;
        this.setCount();
    }

    static new(node = {}) {
        return new TreeviewNode(node);
    }

    static createNode(node) {
        return Node.createNode(node, TreeviewNode.new);
    }

    setCount() {
        if (this.settings.countAccessor(this)) {
            this.data.count = this.settings.countAccessor(this);
        } else if (this.children) {
            this.data.count = this.children.reduce((sum, c) => sum + c.data.count, 0);
        } else {
            this.data.count = 0;
        }
    }

    setSelected(value) {
        this.setRecursiveProperty("selected", value);
    }

        // collapse everything
    collapseAll() {
        if (this.children && this.children.length === 0) {
            this.children = null;
        }
        if (this.children) {
            this._children = this.children;
            this._children.forEach(c => {
                c.collapseAll();
            });
            this.children = null;
        }
    }

        // Collapses a node
    collapse() {
        if (this.children) {
            this._children = this.children;
            this.children = null;
        }
    }

    expandAll() {
        this.expand(100);
    }

        // Expands a node and its children
    expand(i = this.settings.levelsToExpand) {
        if (i > 0) {
            if (this._children) {
                this.children = this._children;
                this._children = null;
            }
            if (this.children) {
                this.children.forEach(c => {
                    c.expand(i - 1);
                });
            }
        }
    }
}
