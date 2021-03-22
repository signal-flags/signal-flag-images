// build/build-svg.js

/**
 * This file builds the flag files into their own repo. This way the git diff
 * can keep track of whether they have changed, and if so then a release needs
 * to be done.
 */

const { mkdir, readFile, readdir, writeFile } = require('fs/promises');
const { join, basename } = require('path');

const { load } = require('js-yaml');

// Use local copy of `signal-flags` module.
const SignalFlags = require('../../signal-flags-js');
// Use `signal-flags` module from `node_modules`.
// const SignalFlags = require('signal-flags');

const { version } = require('../package.json');

// Set some constants.
const inBase = join(__dirname, '..', 'src');
const outBase = join(__dirname, '..');

const homepage = 'https://signalflags.org/';

// Set metadata for file headers.
const ts = new Date().toISOString();

const generated = {
  date: ts.substring(0, 10),
  link: 'https://www.npmjs.com/package/signal-flags',
  version: SignalFlags.version,
};

const license = {
  spdx: 'Unlicense',
  link: 'https://unlicense.org/',
};

const header = `---
# This file describes a set of signal flag images.
# See https://signalflags.org/.
`;

const insert = `author: Signal Flags (https://signalflags.org/)

license:
  spdx: Unlicense
  link: https://unlicense.org/

version: ${version}

generated:
  by: Signal Flags v${generated.version}
  date: ${generated.date}
  link: ${generated.link}`;

const allSvg = {};

const log = console;

function getTypeFilter(type) {
  return ([key]) => SignalFlags.isType(key, type);
}

// Write files for each flag.
async function writeFlagFiles(dir, { id, options }) {
  const filter = getTypeFilter(options.type);
  let count = 0;
  let size = 0;
  // Collect svg for json file.
  let svg = {};
  const promises = [];

  Object.entries(SignalFlags.all({ ...options, file: true }))
    .filter(filter)
    .forEach(([key, svgFile]) => {
      const svgEl = SignalFlags.get(key, options || {});
      try {
        SignalFlags.check(svgFile, { file: true });
        SignalFlags.check(svgEl);
      } catch (err) {
        console.log('Error in SVG for', { key, err, options });
      }

      ++count;
      size += svgFile.length;
      svg[key] = svgEl;

      const outFileName = `${key}.svg`;
      promises.push(writeFile(join(dir, outFileName), svgFile));
    });

  // Add the svg to the whole collection.
  allSvg[id] = svg;

  // Write the svg for this set.
  let json = {
    id,
    meta: {
      homepage,
      version,
      license,
      generated,
      options,
    },
    svg,
  };

  // Write the JSON file.
  let outFile = JSON.stringify(json, null, 2) + '\n';
  promises.push(writeFile(join(dir, `100-svg.json`), outFile));

  await Promise.all(promises);
  log.info(
    'Written',
    count,
    'flag files total',
    size,
    'bytes and',
    outFile.length,
    'bytes of JSON to',
    basename(dir)
  );
}

// Re-write the README file.
async function writeReadme(dir, readme, { id }) {
  const idLine = `\nid: ${id}\n`;
  const outFile = readme
    .replace('---', header + idLine)
    .replace('insert:', insert);
  writeFile(join(dir, '000-README.yaml'), outFile);
}

async function writeOneSet(inFilePath) {
  const readme = (await readFile(inFilePath)).toString('utf-8');

  // The `id` is the name of the file (without .yaml extension).
  const id = basename(inFilePath).slice(0, -5);
  const data = await load(readme);

  const dir = join(outBase, id);
  await mkdir(dir, { recursive: true });

  const promises = [
    writeFlagFiles(dir, { id, ...data }),
    writeReadme(dir, readme, { id }),
  ];
  return Promise.all(promises);
}

async function writeAllJson(outFilePath) {
  let json = {
    meta: {
      homepage,
      version,
      license,
      generated,
    },
    svg: allSvg,
  };

  // Write the JSON file.
  let outFile = JSON.stringify(json, null, 2) + '\n';
  const promise = writeFile(outFilePath, outFile);

  await promise;
  log.info('Written', outFile.length, 'bytes in all JSON file');
  return promise;
}

async function main() {
  // Get all the build input files and build them.
  const promises = (await readdir(inBase)).map((inFileName) => {
    // Check it is a .yaml file and strip the extension.
    if (!inFileName.substring(inFileName.length - 4) === '.yaml') {
      log.info(`Ignoring ${inFileName}`);
      return;
    }
    return writeOneSet(join(inBase, inFileName));
  });

  // Wait for all the files to build.
  await Promise.all(promises);

  // Write the one file to rule them all.
  await writeAllJson(join(outBase, 'svg.json'));

  log.info('Image file build complete');
}

// Run the asynchronous `main` function.
main();
