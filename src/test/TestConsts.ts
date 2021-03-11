export type ImageSnapshotSettings = {
    comparisonMethod: string,
    customSnapshotsDir: string,
    customDiffDir: string
}

export default class TestConsts {
    public static resolveImageSnapshotFolder(path: string): ImageSnapshotSettings {
        const splitted = path.split("/");
        path = splitted.slice(0, splitted.length - 1).join("/")
        return {
            comparisonMethod: 'ssim',
            customSnapshotsDir: path.replace("src", "test/snapshots"),
            customDiffDir: path.replace("src", "test/snapshots/diffs")
        };
    }
}
