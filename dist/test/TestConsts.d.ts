export type ImageSnapshotSettings = {
    comparisonMethod: string;
    customSnapshotsDir: string;
    customDiffDir: string;
    failureThreshold: number;
    failureThresholdType: string;
};
export default class TestConsts {
    static resolveImageSnapshotFolder(path: string): ImageSnapshotSettings;
}
