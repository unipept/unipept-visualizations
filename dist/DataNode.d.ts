export default class DataNode {
    id: number;
    name: string;
    children: DataNode[];
    data: any;
    constructor(id: number, name: string, children?: DataNode[], data?: any);
}
