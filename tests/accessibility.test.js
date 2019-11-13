
// These tests usages Jest, which is actually not required. These tests can be run using simple taiko script.
// Only reason to use jest is the issue https://github.com/andreas-ku/taiko-accessibility/issues/1 with accessibility plugin.
// Once this issue is fixed uncomment the taiko script and remove jest tests and dependency.


const { accessibility, closeBrowser, goto, openBrowser, screenshot } = require('taiko');
const { ok, equal } = require('assert');
const urls = require('./urls.json');
let excludedRules = ['landmark-one-main'];

describe('accessibility', () => {

  beforeAll(async (done) => {
    await openBrowser();
    done();
  });

  afterAll(async () => {
    await closeBrowser();
  });

  urls.forEach(url => {
    test(`${url}`, async () => {
      jest.setTimeout(20000);
      await goto(url);
      await screenshot({path: `./logs/screenshot-for-${url.replace(/file.*\/_build\/(.*)\.html/g,'$1').replace(/\//g,'-')}.png`})
      const audit = await accessibility.runAudit();
      let violations = audit.violations.filter(v => !excludedRules.includes(v.id))
      ok(audit.score >= 97, `Expected: >= ${97}\nReceived:    ${audit.score} for ${url}`);
      equal(violations.length, 0, violations)
    });
  })

});
