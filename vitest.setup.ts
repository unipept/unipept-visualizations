import { expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';


// Custom image snapshot matcher
expect.extend({
  toMatchImageSnapshot(received, snapshotSettings) {
    const { customSnapshotsDir, customDiffDir, failureThreshold = 0.1 } = snapshotSettings || {};

    // Puppeteer returns a Buffer on Node 24 but a plain Uint8Array on Node 25, and
    // pngjs only accepts a Buffer. Wrap the bytes without copying them.
    const image = Buffer.isBuffer(received)
      ? received
      : Buffer.from(received.buffer, received.byteOffset, received.byteLength);

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
      fs.writeFileSync(snapshotPath, image);
      return {
        pass: true,
        message: () => `Snapshot created at ${snapshotPath}`
      };
    }

    // Compare with existing snapshot
    const img1 = PNG.sync.read(fs.readFileSync(snapshotPath));
    const img2 = PNG.sync.read(image);
    const {width, height} = img1;
    const diff = new PNG({width, height});

    // pixelmatch returns the number of pixels that differ, not a verdict.
    const mismatchedCount = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: failureThreshold});
    // Also check if the relative amount of mismatched pixels is within the threshold
    const mismatchedPixels = (mismatchedCount / (width * height));
    const matches = mismatchedPixels <= failureThreshold;

    // If test fails and diff directory is specified, save the received image for comparison
    if (!matches && customDiffDir) {
      const actualPath = path.join(customDiffDir, `actual_${snapshotName}`);
      const diffPath = path.join(customDiffDir, `diff_${snapshotName}`);
      fs.writeFileSync(actualPath, image);
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }

    return {
      pass: matches,
      message: () => matches
          ? `Snapshot matches ${snapshotPath}`
          : `Snapshot does not match ${snapshotPath}. ${customDiffDir ? `See diff at ${path.join(customDiffDir, `diff_${snapshotName}`)}` : ''}`
    };
  }
});
