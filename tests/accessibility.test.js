
// These tests usages Jest, which is actually not reuired. These tests can be run using simple taiko script.
// Only reason to use jest is the issue https://github.com/andreas-ku/taiko-accessibility/issues/1 with accessiblity plugin.
// Once this issue is fixed uncomment the taiko script and remove jest tests and dependecy.

const { accessibility, closeBrowser, goto, openBrowser } = require('taiko');
const { ok, equal } = require('assert');
const urls = require('./urls.json');
let excludedRules = ['landmark-one-main'];

describe('accessibility', () => {

  beforeAll(async () => {
    await openBrowser();
  });

  afterAll(async () => {
    await closeBrowser();
  });

  urls.forEach(url => {
    test(`${url}`, async () => {
      jest.setTimeout(20000);
      await goto(url);
      const audit = await accessibility.runAudit();
      let violations = audit.violations.filter(v => !excludedRules.includes(v.id))
      ok(audit.score >= 97, `Expected: >= ${97}\nReceived:    ${audit.score}`);
      equal(violations.length, 0, violations)
    });
  })

});


// Test using simple taiko script.


/*
const { accessibility, closeBrowser, goto, openBrowser } = require('taiko');
const { ok, equal } = require('assert');
let urls = require('./urls.json');
let excludedRules = ['landmark-one-main'];

async function runTest() {
  let code = 0;
  await openBrowser({ headless: true });
  for (let url of urls) {
    try {
      console.log(`Accessibility test for ${url}\n`);
      await goto(url);
      const audit = await accessibility.runAudit();
      let violations = audit.violations.filter(v => !excludedRules.includes(v.id))
      ok(audit.score >= 97, `Expected: >= ${97}\nReceived:    ${audit.score}`);
      equal(violations.length, 0, violations)
    } catch (error) {
      console.log(typeof error);

      console.error('\x1b[31m',error,'\x1b[0m');
      code = 1;
    }
  }
  await closeBrowser();
  process.exitCode = code
}

runTest();

*/
