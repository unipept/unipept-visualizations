// @ts-nocheck

import Sunburst from "./../Sunburst";
import { waitForCondition } from "./../../../test/TestUtils";
import SunburstSettings from "./../SunburstSettings";
import DataNode from "./../../../DataNode";

const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const taxonomyObject = require('./resources/taxonomy.json');

describe("Sunburst", () => {
    let browser: any;

    async function createScreenshotForSunburst(settings: SunburstSettings): Promise<any> {
        const dom = new JSDOM(`<!DOCTYPE html><div id="visualization"></div>`, {
            beforeParse(window: any) {
                window.Element.prototype.getComputedTextLength = function() {
                    return 20
                }
            }
        });

        const element = dom.window.document.getElementById("visualization");

        // Animations need to be disabled during the tests
        settings["animationDuration"] = 0;

        const sunburst = new Sunburst(element, taxonomyObject, settings);

        await waitForCondition(() => element.innerHTML.includes("svg"), 500, 3000);

        const page = await browser.newPage();
        await page.setContent(dom.serialize());

        const image = await page.screenshot();

        return image;
    }

    beforeAll(async () => {
        browser = await puppeteer.launch();
    });

    it("should produce the expected image with the default settings", async () => {
        expect(await createScreenshotForSunburst({})).toMatchImageSnapshot();
    });

    it("should use fixed colors if requested", async() => {
        expect(await createScreenshotForSunburst({
            useFixedColors: true
        })).toMatchImageSnapshot();
    });

    it("should change labels if requested", async() => {
        expect(await createScreenshotForSunburst({
            getLabel: (x: DataNode) => x.id
        })).toMatchImageSnapshot();
    });

    afterAll(async () => {
        await browser.close();
    });
});
