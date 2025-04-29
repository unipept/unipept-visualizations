import { expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
//@ts-ignore
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';


// Custom image snapshot matcher
expect.extend({
  toMatchImageSnapshot(received, snapshotSettings) {
    const { customSnapshotsDir, customDiffDir, failureThreshold = 0.1 } = snapshotSettings || {};

    if (!customSnapshotsDir) {
      throw new Error('customSnapshotsDir must be specified');
    }

    // Create directories if they don't exist
    if (!fs.existsSync(customSnapshotsDir)) {
      fs.mkdirSync(customSnapshotsDir, { recursive: true });
    }

    if (customDiffDir && !fs.existsSync(customDiffDir)) {
      fs.mkdirSync(customDiffDir, { recursive: true });
    }

    // Extract test name from the current test context
    const testPath = this.testPath || '';
    const testName = path.basename(testPath, path.extname(testPath));
    const currentTest = this.currentTestName?.replace(/\s+/g, '_') || 'unknown_test';

    // Create a stable snapshot name based on the test name
    const snapshotName = `${testName}_${currentTest}.png`;
    const snapshotPath = path.join(customSnapshotsDir, snapshotName);

    // If snapshot doesn't exist, create it (first run)
    if (!fs.existsSync(snapshotPath)) {
      fs.writeFileSync(snapshotPath, received);
      return {
        pass: true,
        message: () => `Snapshot created at ${snapshotPath}`
      };
    }

    // Compare with existing snapshot
    const existing = fs.readFileSync(snapshotPath);

    const img1 = PNG.sync.read(fs.readFileSync(snapshotPath));
    const img2 = PNG.sync.read(received);
    const {width, height} = img1;
    const diff = new PNG({width, height});

    const pass = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: failureThreshold});
    // Also check if the relative amount of mismatched pixels is within the threshold
    const mismatchedPixels = (pass / (width * height));

    // If test fails and diff directory is specified, save the received image for comparison
    if (mismatchedPixels > failureThreshold && customDiffDir) {
      const actualPath = path.join(customDiffDir, `actual_${snapshotName}`);
      const diffPath = path.join(customDiffDir, `diff_${snapshotName}`);
      fs.writeFileSync(actualPath, received);
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }

    return {
      pass: mismatchedPixels <= failureThreshold,
      message: () => pass
          ? `Snapshot matches ${snapshotPath}`
          : `Snapshot does not match ${snapshotPath}. ${customDiffDir ? `See diff at ${path.join(customDiffDir, `diff_${snapshotName}`)}` : ''}`
    };
  }
});
