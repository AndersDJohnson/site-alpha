
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

helpers.assetHash = function (filepath, opts) {

  var md5 = require('md5');
  var fs = require('fs');
  var path = require('path');

  var dest = opts.data.root.dest.dest;
  var public = opts.data.root.public;
  var publicDir = path.dirname(public);

  var assets = public.replace(opts.data.root.dest.path, '');

  var base = assets;

  var realpath = path.join(base, dest, filepath);
  var relpath = path.relative(publicDir, realpath);

  var buf = fs.readFileSync(realpath);
  var hash = md5(buf);

  return relpath + '?cb=' + hash;
};
