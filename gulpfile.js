var gulp = require('gulp');
var assemble = require('assemble');
var path = require('path');
var helpers = require('./lib/helpers');
var middleware = require('./lib/middleware');

// assemble.enable('debug');
// assemble.set('debug', true);
// assemble.option('debug', true);

var configureLodash = function (instance) {
  var lodash = require('engine-lodash');

  assemble.engine('html', lodash);
  assemble.engine('tmpl', lodash);

  instance.option('delims', ['<%', '%>']);
  instance.option('ext', '.tmpl');

  instance.preRender(/./, middleware.dataAlias);

  return lodash;
};

configureLodash(assemble);


// assemble.engine('html', require('engine-handlebars'));
// assemble.engine('hbs', require('engine-handlebars'));
// var extname = require('gulp-extname');

// console.log(assemble.getEngine('html'));

// console.log(assemble.engines['.html'].renderSync('<%= this.ok %>', {}))

/**
 * https://github.com/assemble/assemble/issues/687
 */
assemble.option('renameKey', function (fp) {
  var dirname = path.dirname(fp);
  var basename = path.basename(fp);
  var last = path.basename(dirname);
  return path.join(last, basename);
});


// assemble.layouts('src/layouts/*.hbs');
assemble.layouts('src/layouts/*.tmpl');

// assemble.set('layout', 'layouts/default.hbs');
// // assemble.set('layout', 'layouts/default');
// assemble.options({
//     layout: 'layouts/default.hbs'
// });
// assemble.options.layout = 'layouts/default.hbs';
// assemble.option('layout', 'layouts/default.hbs');

// console.log(assemble.cache);
// console.log(assemble);

assemble.helpers(helpers);


assemble.data('src/data/**/*');

/**
 * Ext issues: https://github.com/assemble/assemble/issues/642
 */
gulp.task('html', function() {
  assemble.option('assets', 'dist');
  // assemble.src(['src/templates/**/*.html'], {
  assemble.src(['src/tmpl/**/*.html'], {
    // layout: 'src/layouts/default.tmpl',
    // layout: 'src/layouts/default.hbs',
    // layout: 'layouts/default.hbs',
    layout: 'layouts/default.tmpl',
    assets: 'dist'
  })
  // assemble.src(['templates/**/*.hbs'])
    // .pipe(extname('.html'))
    .pipe(assemble.dest('dist'));
});

gulp.task('css', function () {
  var instance = assemble.init();
  instance.helpers(helpers);
  var lodash = configureLodash(instance);
  instance.engine('css', lodash);
  instance.src(['css/**/*.css'], {
    cwd: 'src/public',
    base: 'src/public',
    layout: false,
    assets: 'dist'
  })
    .pipe(instance.dest('dist'));
});

gulp.task('public', function () {
  gulp.src(['src/public/**/*','!src/public/css/**/*'])
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'public', 'css']);
