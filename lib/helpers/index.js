
var helpers = {};
module.exports = helpers;

var relativeDest = require('relative-dest');

/**
 * Get data context object, handling both Handlebars and Lodash cases.
 * @param  {object} opts     Handlebars adds automatically. Lodash should pass context.
 * @return {string}          Normalized data object.
 */
var getData = function (opts) {
  return opts.data && opts.data.root ? opts.data.root : opts;
}

helpers.get = function (path) {
  var get = require('get-value');
  var value = get(this.context, path);
  return value == null ? '' : value;
};

helpers.relativeUrl = function (from, to, opts) {
  var data = getData(opts);
  var dest = data.dest.dest;
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

/**
 * 
 * @param  {string} filepath File to hash.
 * @param  {object} opts     Optional. Handlebars adds automatically. Lodash should pass context.
 * @return {string}          Relative URL to file with added cache bust query parameter.
 */
helpers.assetHash = function (filepath, opts) {

  var data = getData(opts);

  var md5 = require('md5');
  var fs = require('fs');
  var path = require('path');

  var dest = data.dest.dest;
  var public = data.public;
  var publicDir = path.dirname(public);

  var assets = public.replace(data.dest.path, '');

  var base = assets;

  var realpath = path.join(base, dest, filepath);
  var relpath = path.relative(publicDir, realpath);

  var buf = fs.readFileSync(realpath);
  var hash = md5(buf);

  return relpath + '?cb=' + hash;
};


// Handlebars version
// helpers.assetHash = function (filepath, opts) {

//   console.log(arguments)

//   var md5 = require('md5');
//   var fs = require('fs');
//   var path = require('path');

//   var dest = opts.data.root.dest.dest;
//   var public = opts.data.root.public;
//   var publicDir = path.dirname(public);

//   var assets = public.replace(opts.data.root.dest.path, '');

//   var base = assets;

//   var realpath = path.join(base, dest, filepath);
//   var relpath = path.relative(publicDir, realpath);

//   var buf = fs.readFileSync(realpath);
//   var hash = md5(buf);

//   return relpath + '?cb=' + hash;
// };
