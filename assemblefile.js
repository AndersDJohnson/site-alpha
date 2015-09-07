var assemble = require('assemble');
var path = require('path');
assemble.engine('html', require('engine-handlebars'));
// assemble.engine('hbs', require('engine-handlebars'));
// var extname = require('gulp-extname');
// assemble.engine('html', require('engine-lodash'));

// console.log(assemble.engines['.html'])

/**
 * https://github.com/assemble/assemble/issues/687
 */
assemble.option('renameKey', function (fp) {
  var dirname = path.dirname(fp);
  var basename = path.basename(fp);
  var last = path.basename(dirname);
  return path.join(last, basename);
});


assemble.layouts('layouts/*.hbs');
// assemble.layouts('layouts/*.tmpl');

// assemble.set('layout', 'layouts/default.hbs');
// // assemble.set('layout', 'layouts/default');
// assemble.options({
//     layout: 'layouts/default.hbs'
// });
// assemble.options.layout = 'layouts/default.hbs';
// assemble.option('layout', 'layouts/default.hbs');

// console.log(assemble.cache);
// console.log(assemble.options);

var relativeDest = require('relative-dest');

assemble.helper('relativeUrl', function (from, to, opts) {
  var dest = opts.data.root.dest.dest;
  return relativeDest(from, dest + '/' + to);
});

/**
 * Ext issues: https://github.com/assemble/assemble/issues/642
 */
assemble.task('html', function() {
  assemble.option('assets', 'dist');
  assemble.src(['templates/**/*.html'], {
    // layout: 'layouts/default.tmpl',
    layout: 'layouts/default.hbs',
    // layoutDelims: ['!_', '_!'],
    assets: 'dist'
  })
  // assemble.src(['templates/**/*.hbs'])
    // .pipe(extname('.html'))
    .pipe(assemble.dest('dist'));
});

assemble.task('public', function () {
  assemble.src(['public/**/*'])
    .pipe(assemble.dest('dist'));
});

assemble.task('default', ['html', 'public']);
