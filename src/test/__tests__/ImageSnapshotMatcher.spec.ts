import { afterAll, describe, expect, it } from "vitest";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const SNAPSHOT_FIXTURE = path.resolve(
    __dirname,
    "../../../test/snapshots/visualizations/barplot/__tests__/Barplot.spec_Barplot_>_should_render_a_barplot_with_default_settings.png"
);

describe("toMatchImageSnapshot", () => {
    const customSnapshotsDir = fs.mkdtempSync(path.join(os.tmpdir(), "image-snapshot-matcher-"));

    afterAll(() => {
        fs.rmSync(customSnapshotsDir, { recursive: true, force: true });
    });

    // Puppeteer returns a Buffer on Node 24 but a plain Uint8Array on Node 25, so the
    // matcher has to cope with a screenshot that is not a Buffer.
    it("accepts a Uint8Array", () => {
        const png = new Uint8Array(fs.readFileSync(SNAPSHOT_FIXTURE));
        expect(Buffer.isBuffer(png)).toBe(false);

        // The first call has no snapshot to compare against yet, so it writes one.
        expect(png).toMatchImageSnapshot({ customSnapshotsDir });

        const written = fs.readdirSync(customSnapshotsDir);
        expect(written).toHaveLength(1);
        expect(fs.readFileSync(path.join(customSnapshotsDir, written[0]))).toEqual(Buffer.from(png));

        // The second call compares the same bytes against the snapshot just written.
        expect(png).toMatchImageSnapshot({ customSnapshotsDir });
    });
});
