import NodeUtils from "./../NodeUtils";

describe("NodeUtils.isParentOf", () => {
    // Construct hierarchy with explicit parent pointers
    const root: any = {
        id: 1,
        depth: 0,
        parent: null,
        children: []
    };

    const node2: any = { id: 2, depth: 1, parent: root, children: [] };
    const node6: any = { id: 6, depth: 1, parent: root, children: [] };
    root.children.push(node2, node6);

    const node3: any = { id: 3, depth: 2, parent: node2, children: [] };
    const node4: any = { id: 4, depth: 2, parent: node2, children: [] };
    node2.children.push(node3, node4);

    const node5: any = { id: 5, depth: 3, parent: node4, children: [] };
    node4.children.push(node5);

    const hierarchy = root;

    it("should correctly detect proper parents", () => {
        const parent = hierarchy;
        const child = node5;

        // @ts-ignore
        expect(NodeUtils.isParentOf(parent, child, 4)).toBeTruthy();
    });

    it("should correctly refuse child nodes that are too deep", () => {
        const parent = hierarchy;
        const child = node5;

        // @ts-ignore
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

        // @ts-ignore
        expect(NodeUtils.isParentOf(parent, child, 5)).toBeFalsy();
    });
});
