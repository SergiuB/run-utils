const parseArgs = require('minimist');
const R = require('ramda');

var argv = parseArgs(process.argv.slice(2));

if (argv['_'].length < 2) {
  console.error('Usage: node rename oldPath newPath')
}

const [oldPath, newPath] = argv['_'];

require('fs').rename(oldPath,newPath);

console.log(`Renamed ${oldPath} to ${newPath}`);