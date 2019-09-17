const { accessibility, closeBrowser, goto, openBrowser } = require('taiko');
let urls = require('./urls.json');

describe('accessibility', () => {

    beforeAll(async () => {
        await openBrowser({headless:false});
    });

    afterAll(async () => {
        await closeBrowser();
    });

    for (let url of urls) {
        test(`Should be accessible for ${url}`, async () => {
            jest.setTimeout(20000);
            await goto(url);
            const audit = await accessibility.runAudit();
            expect(audit.score).toBeGreaterThan(85);
            console.log(audit.violations);
            // expect(audit.violations.length).toEqual(0);
        });
    }

});