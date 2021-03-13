// build/build-svg.js

/**
 * This file builds the flag files into their own repo. This way the git diff
 * can keep track of whether they have changed, and if so then a release needs
 * to be done.
 */

const { mkdirSync, readFileSync, readdirSync, writeFileSync } = require('fs');

const { resolve } = require('path');
const { load } = require('js-yaml');

const SignalFlags = require('signal-flags');

const { version } = require('../package.json');

// Set some constants.
const inBase = resolve(__dirname, '..', 'src');
const outBase = resolve(__dirname, '..');

const ts = new Date().toISOString();

const generated = {
  date: ts.substring(0, 10),
  link: 'https://github.com/signal-flags/signal-flags-js',
  version: SignalFlags.version,
  // engine: `${process.release.name} ${process.version}`,
};

const licenseFile = readFileSync(resolve(__dirname, '..', 'LICENSE')).toString(
  'utf-8'
);

// Get all the build input files and build them.
readdirSync(inBase).forEach((inFileName) => {
  // Check it is a .yaml file and strip the extension.
  if (!inFileName.substring(inFileName.length - 4) === '.yaml') {
    console.log(`Ignoring ${inFileName}`);
    return;
  }

  // Parse the input YAML and start writing.
  const outDirName = inFileName.substring(0, inFileName.length - 5);
  const outPath = resolve(outBase, outDirName);

  console.log('Writing to', outPath);

  const inFile = readFileSync(resolve(inBase, inFileName)).toString('utf-8');
  const build = load(inFile);

  mkdirSync(outPath, { recursive: true });
  const { options, description, license } = build;

  // Write files for each flag.
  Object.entries(SignalFlags.all({ ...options, file: true })).forEach(
    ([key, outFile]) => {
      try {
        SignalFlags.check(outFile, { file: true });
      } catch (e) {
        console.log('Error in SVG file for', key, e);
      }

      const outFileName = `${key}.svg`;
      writeFileSync(resolve(outPath, outFileName), outFile);
    }
  );

  // Write the JSON file for all flags.
  let json = {
    meta: {
      description,
      license,
      generated,
    },
    svg: SignalFlags.all(options || {}),
  };

  // Write the JSON file.
  let outFile = JSON.stringify(json, null, 2) + '\n';
  writeFileSync(resolve(outPath, `100-svg.json`), outFile);

  // Write a JS file for web users.
  // outFile = `SvgLoad.add(${outFile})`;
  // fs.writeFileSync(resolve(outPath, `110-svg.js`), outFile);

  const header = [
    '---',
    '# This file describes a set of signal flag images.',
    '# See https://github.com/signal-flags/signal-flag-images.',
    '',
  ].join('\n');

  const insert = [
    `version: ${version}`,
    '',
    'generated:',
    `  by: Signal Flags v${generated.version}`,
    `  date: ${generated.date}`,
    `  link: ${generated.link}`,
    // `  engine: ${generated.engine}`,
    '',
    'options:',
  ].join('\n');

  // Re-write the README file.
  outFile = inFile.replace('---', header).replace('options:', insert);
  writeFileSync(resolve(outPath, '000-README.yaml'), outFile);

  // Copy over the LICENSE file.
  writeFileSync(resolve(outPath, '010-LICENSE'), licenseFile);
});
