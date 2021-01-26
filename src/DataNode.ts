import * as d3 from "d3";

export default class DataNode {
    constructor(
        public id: number,
        public name: string,
        public children: DataNode[] = [],
        public data: any = {}
    ) {}
}
