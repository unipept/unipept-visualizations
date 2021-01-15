export default class DataNode {
    constructor(
        public id: number,
        public name: string,
        public children: DataNode[] = [],
        public data: any = {}
    ) {}

}
