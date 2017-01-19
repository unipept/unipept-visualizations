let univis = {};

univis.Node = class Node {
    constructor(node = {}) {
        this.data = {};
        Object.assign(this, node);
    }

    static new(node = {}) {
        return new Node(node);
    }

    static createNode(node, construct = Node.new) {
        if (node.children) {
            node.children = node.children.map(
                n => Node.createNode(n, construct)
            );
        }
        return construct.call(null, node);
    }

    // sets a property for a node and all its children
    setRecursiveProperty(property, value) {
        this[property] = value;
        if (this.children) {
            this.children.forEach(c => {
                c.setRecursiveProperty(property, value);
            });
        } else if (this._children) {
            this._children.forEach(c => {
                c.setRecursiveProperty(property, value);
            });
        }
    }

    // Returns true if a node is a leaf
    isLeaf() {
        return (!this.children && !this._children) ||
            (this.children && this.children.length === 0) ||
            (this._children && this._children.length === 0);
    }

    getHeight() {
        if (this._height === undefined) {
            if (this.isLeaf()) {
                this._height = 0;
            } else {
                this._height = d3.max(this.children, c => c.getHeight()) + 1;
            }
        }
        return this._height;
    }

    getDepth() {
        if (this._depth === undefined) {
            if (this.parent === undefined) {
                this._depth = 0;
            } else {
                this._depth = this.parent.getDepth() + 1;
            }
        }
        return this._depth;
    }
};
