import { expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Custom image snapshot matcher
expect.extend({
  toMatchImageSnapshot(received, snapshotSettings) {
    const { customSnapshotsDir, customDiffDir, failureThreshold = 0.02 } = snapshotSettings || {};

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
    const pass = Buffer.compare(existing, received) === 0;

    // If test fails and diff directory is specified, save the received image for comparison
    if (!pass && customDiffDir) {
      const diffPath = path.join(customDiffDir, `diff_${snapshotName}`);
      fs.writeFileSync(diffPath, received);
    }

    return {
      pass,
      message: () => pass
          ? `Snapshot matches ${snapshotPath}`
          : `Snapshot does not match ${snapshotPath}. ${customDiffDir ? `See diff at ${path.join(customDiffDir, `diff_${snapshotName}`)}` : ''}`
    };
  }
});
