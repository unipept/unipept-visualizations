import NodeUtils from "./../NodeUtils";

describe("NodeUtils.isParentOf", () => {
    const hierarchy = {
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
    }

    it("should correctly detect proper parents", () => {
        const parent = hierarchy;
        const child = hierarchy.children[0].children[1].children[0];

        // @ts-ignore
        expect(NodeUtils.isParentOf(parent, child, 4)).toBeTruthy();
    });

    it("should correctly refuse child nodes that are too deep", () => {
        const parent = hierarchy;
        const child = hierarchy.children[0].children[1].children[0];

        // @ts-ignore
        expect(NodeUtils.isParentOf(parent, child, 3)).toBeFalsy();
    });

    it("should return false for nodes that are not a child", () => {
        const parent = hierarchy;
        const child = {
            id: 7,
            depth: 3,
            children: []
        };

        // @ts-ignore
        expect(NodeUtils.isParentOf(parent, child, 5)).toBeFalsy();
    });
});
