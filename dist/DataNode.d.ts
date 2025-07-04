export default class DataNode {
    id: number;
    name: string;
    children: DataNode[];
    count: number;
    selfCount: number;
    extra: any;
    constructor(id: number, name: string, children: DataNode[], count: number, selfCount: number, extra?: any);
}
/**
 * The visualizations are flexible in the kind of data that they require. This type is very much like a DataNode, but
 * does not specifically require all the different information fields. The visualizations will preprocess all data that
 * they are given and convert it into real DataNode's that do contain all the required fields (which will be filled with
 * placeholders during the conversion if they are not provided by the user).
 */
export type DataNodeLike = {
    count: number;
    selfCount: number;
    id?: number;
    name?: string;
    children?: DataNodeLike[];
    extra?: any;
};
