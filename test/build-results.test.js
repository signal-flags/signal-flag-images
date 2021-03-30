// ./built-files.test.js

const { expect } = require('chai');

const { load } = require('js-yaml');

const { readFileSync } = require('fs');

const { version } = require('../package.json');
const { version: sfVersion } = require('signal-flags/package.json');

const readme = readFileSync('./README.md').toString('utf-8');

describe('signal-flag-images', function () {
  describe('The README.md file', function () {
    it('should have the same date as a flag directory README', function () {
      const data = load(readFileSync('./sf-pennant-outline/000-README.yaml'));
      const expected = data.generated.date.toISOString().substring(0, 10);

      const [, text] = readme.match(/created on (.*) using/);
      const received = new Date(text + ' 12:00').toISOString().substring(0, 10);

      expect(received).to.equal(expected);
    });

    it('should have the same version as package.json', function () {
      const [, text, url] = readme.match(
        /\[version (.*)\]\(http.*\/v(.*).zip\)/
      );

      expect(text).to.equal(version);
      expect(url).to.equal(version);
    });

    it('should have the right signal-flags version', function () {
      const [, text] = readme.match(/`signal-flags` version (.*)\.\n/);

      expect(text).to.equal(sfVersion);
    });
  });
});
