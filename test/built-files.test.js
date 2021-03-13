// ./built-files.test.js

const { expect } = require('chai');

const { readFileSync } = require('fs');
const { resolve } = require('path');

const { version } = require('../package.json');
const { version: sfVersion } = require('signal-flags/package.json');

const readme = readFileSync(resolve(__dirname, '..', 'README.md')).toString(
  'utf-8'
);

describe('The README.md file', () => {
  it("should have today's date", () => {
    const [, text] = readme.match(/created on (.*) using/);
    const today = Math.trunc(new Date().valueOf() / 86400000);
    expect(new Date(text).valueOf() / 86400000).to.equal(today);
  });

  it('should have the same version as package.json', () => {
    const [, text] = readme.match(/\nVersion (.*)\.\n/);

    expect(text).to.equal(version);
  });

  it('should have the right signal-flags version', () => {
    const [, text] = readme.match(/`signal-flags` version (.*)\.\n/);

    expect(text).to.equal(sfVersion);
  });
});
