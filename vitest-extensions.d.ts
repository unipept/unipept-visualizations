// vitest-extensions.d.ts
import 'vitest';

declare module 'vitest' {
  interface Assertion<_T = any> {
    toMatchImageSnapshot: (snapshotSettings?: {
      customSnapshotsDir?: string;
      customDiffDir?: string;
      failureThreshold?: number;
    }) => unknown;
  }
}
