import NodeUtils from "./../NodeUtils";

/**
 * Links every node to its parent, the way d3.hierarchy() does. isParentOf walks
 * up from the child, so a fixture without these pointers only exercises the
 * depth guard.
 */
function linkParents(node: any, parent: any = null): any {
    node.parent = parent;
    (node.children ?? []).forEach((child: any) => linkParents(child, node));
    return node;
}

describe("NodeUtils.isParentOf", () => {
    const hierarchy = linkParents({
        id: 1,
        depth: 0,
        children: [
            {
                id: 2,
                depth: 1,
                children: [
                    {
                        id: 3,
                        depth: 2,
                        children: []
                    },
                    {
                        id: 4,
                        depth: 2,
                        children: [
                            {
                                id: 5,
                                depth: 3,
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 6,
                depth: 1,
                children: []
            }
        ]
    });

    it("should correctly detect proper parents", () => {
        const parent = hierarchy;
        const child = hierarchy.children[0].children[1].children[0];

        expect(NodeUtils.isParentOf(parent, child, 4)).toBeTruthy();
    });

    it("should correctly detect intermediate parents", () => {
        const parent = hierarchy.children[0].children[1];
        const child = parent.children[0];

        expect(NodeUtils.isParentOf(parent, child, 4)).toBeTruthy();
    });

    it("should consider a node its own parent", () => {
        const node = hierarchy.children[0];

        expect(NodeUtils.isParentOf(node, node, 4)).toBeTruthy();
    });

    it("should not treat a child as the parent of its own parent", () => {
        const parent = hierarchy.children[0];
        const child = parent.children[0];

        expect(NodeUtils.isParentOf(child, parent, 4)).toBeFalsy();
    });

    it("should return false for nodes in a different branch", () => {
        const parent = hierarchy.children[0];
        const other = hierarchy.children[1];

        expect(NodeUtils.isParentOf(parent, other, 4)).toBeFalsy();
    });

    it("should correctly refuse child nodes that are too deep", () => {
        const parent = hierarchy;
        const child = hierarchy.children[0].children[1].children[0];

        expect(NodeUtils.isParentOf(parent, child, 3)).toBeFalsy();
    });

    it("should return false for nodes that are not a child", () => {
        const parent = hierarchy;
        const child = {
            id: 7,
            depth: 3,
            children: [],
            parent: null
        };

        // @ts-expect-error
        expect(NodeUtils.isParentOf(parent, child, 5)).toBeFalsy();
    });
});
