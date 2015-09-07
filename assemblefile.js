var assemble = require('assemble');
var path = require('path');
assemble.engine('html', require('engine-handlebars'));
// assemble.engine('hbs', require('engine-handlebars'));
// var extname = require('gulp-extname');

/**
 * https://github.com/assemble/assemble/issues/687
 */
assemble.option('renameKey', function (fp) {
  var dirname = path.dirname(fp);
  var basename = path.basename(fp);
  var last = path.basename(dirname);
  return path.join(last, basename);
});

/**
 * Ext issues: https://github.com/assemble/assemble/issues/642
 */
assemble.task('html', function() {
  assemble.src(['templates/**/*.html'])
  // assemble.src(['templates/**/*.hbs'])
    // .pipe(extname('.html'))
    .pipe(assemble.dest('dist/'));
});

assemble.task('public', function () {
  assemble.src(['public/**/*'])
    .pipe(assemble.dest('dist/'));
});

assemble.task('default', ['html', 'public']);
