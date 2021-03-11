// eslint-disable-next-line no-undef
module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return testPath.replace("src", "test/snapshots") + snapshotExtension;
    },

    // resolves from snapshot to test path
    resolveTestPath: (snapshotFilePath, snapshotExtension) =>
        snapshotFilePath
            .replace("test/snapshots", "src")
            .slice(0, -snapshotExtension.length),
    testPathForConsistencyCheck: "some/__tests__/example.test.js",
};
