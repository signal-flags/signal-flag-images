// ./built-files.test.js

const { expect } = require('chai');

const { readFileSync } = require('fs');
const { resolve } = require('path');

const { version } = require('../package.json');
const { version: sfVersion } = require('signal-flags/package.json');

const readme = readFileSync(resolve(__dirname, '..', 'README.md')).toString(
  'utf-8'
);

describe('The README.md file', function () {
  it("should have today's date", function () {
    const [, text] = readme.match(/created on (.*) using/);
    const today = Math.trunc(new Date().valueOf() / 86400000);
    expect(new Date(text).valueOf() / 86400000).to.equal(today);
  });

  it('should have the same version as package.json', function () {
    const [, text, url] = readme.match(/\[version (.*)\]\(http.*v(.*).zip\)/);

    expect(text).to.equal(version);
    expect(url).to.equal(version);
  });

  it('should have the right signal-flags version', function () {
    const [, text] = readme.match(/`signal-flags` version (.*)\.\n/);

    expect(text).to.equal(sfVersion);
  });
});
