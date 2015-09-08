
var middleware = {};
module.exports = middleware;

/**
 * Alias 'data' to 'data.data' for undefined-safe access.
 * preRender
 */
middleware.dataAlias = function (file, next) {
  file.data.data = file.data;
  next();
};
