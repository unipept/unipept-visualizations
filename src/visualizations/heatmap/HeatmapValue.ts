/**
 * A HeatmapValue denotes a single datapoint in a matrix of input values. The rowId and columnId fields of this value
 * will be filled in by the Heatmap itself (based upon the current row/column this value is situated in).
 */
export interface HeatmapValue {
    value: number,
    rowId: number,
    columnId: number,
    color: string
}
