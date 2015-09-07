var assemble = require('assemble');

assemble.task('html', function() {
  assemble.src(['templates/*.html', 'templates/**/*.html'])
    .pipe(assemble.dest('dist/'));
});

assemble.task('public', function () {
  assemble.src(['public/*', 'public/**/*'])
    .pipe(assemble.dest('dist/'));
});

assemble.task('default', ['html', 'public']);
