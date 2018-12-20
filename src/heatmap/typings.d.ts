export interface HeatmapElement {
    id?: string,
    name: string,
    extras?: any
}

export interface HeatmapValue {
    value: number,
    rowId?: string,
    columnId?: string
}

export interface HeatmapData {
    rows: HeatmapElement[],
    columns: HeatmapElement[],
    values: HeatmapValue[][] | number[][]
}
