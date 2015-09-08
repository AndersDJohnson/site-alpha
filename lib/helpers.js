
var helpers = {};
module.exports = helpers;


var relativeDest = require('relative-dest');

helpers.relativeUrl = function (from, to, opts) {
  var dest = opts.data.root.dest.dest;
  return relativeDest(from, dest + '/' + to);
};

helpers.json = function (data) {
  return JSON.stringify(data);
};

helpers.eq = function (a, b, opts) {
  return a === b ? opts.fn() : '';
};
helpers.neq = function (a, b, opts) {
  return a !== b ? opts.fn() : '';
};

helpers.assetHash = function (filepath, to, opts) {
  if (!opts) {
    opts = to;
    to = null;
  }
  var dest = opts.data.root.dest.dest;
  var assets = opts.data.root.assets;

  var base = to || assets;

  var md5 = require('md5');
  var fs = require('fs');
  var path = require('path');

  var realpath = dest + '/' + filepath;

  var buf = fs.readFileSync(realpath);
  var hash = md5(buf);

  var relpath = path.relative(base, filepath);

  return relpath + '?cb=' + hash;
};
