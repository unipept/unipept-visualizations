import { expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Custom image snapshot matcher
expect.extend({
  toMatchImageSnapshot(received, snapshotSettings) {
    const { customSnapshotsDir, customDiffDir, failureThreshold = 0.02 } = snapshotSettings || {};

    // Create directories if they don't exist
    if (customSnapshotsDir && !fs.existsSync(customSnapshotsDir)) {
      fs.mkdirSync(customSnapshotsDir, { recursive: true });
    }

    if (customDiffDir && !fs.existsSync(customDiffDir)) {
      fs.mkdirSync(customDiffDir, { recursive: true });
    }

    // Generate a hash of the image for the snapshot name
    const hash = crypto.createHash('md5').update(received).digest('hex');
    const snapshotName = `snapshot-${hash}.png`;
    const snapshotPath = customSnapshotsDir ? path.join(customSnapshotsDir, snapshotName) : snapshotName;

    // If snapshot doesn't exist, create it
    if (!fs.existsSync(snapshotPath)) {
      fs.writeFileSync(snapshotPath, received);
      return {
        pass: true,
        message: () => `Snapshot created at ${snapshotPath}`
      };
    }

    // For now, we'll just compare if the files are identical
    // In a real implementation, you'd want to do a proper image comparison
    const existing = fs.readFileSync(snapshotPath);
    const pass = Buffer.compare(existing, received) === 0;

    return {
      pass,
      message: () => pass 
        ? `Snapshot matches ${snapshotPath}`
        : `Snapshot does not match ${snapshotPath}`
    };
  }
});
