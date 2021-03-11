import { DataNodeLike } from "./../../../DataNode";
import SunburstPreprocessor from "./../SunburstPreprocessor";

describe("SunburstPreprocessor", () => {
    it("should convert objects with only mandatory fields into proper DataNode's", () => {
        const nodes: DataNodeLike = {
            count: 10,
            selfCount: 5,
            children: [
                {
                    count: 5,
                    selfCount: 1
                },
                {
                    count: 7,
                    selfCount: 4
                }
            ]
        };

        const preprocessor = new SunburstPreprocessor();
        const processedNode = preprocessor.preprocessData(nodes);

        expect(processedNode.id).toBeTruthy();
        expect(processedNode.extra).toEqual({});
        expect(processedNode.name).toEqual("");
        // Id's of processed nodes should be distinct
        expect(processedNode.id).not.toEqual(processedNode.children[1].id);
    });
});
