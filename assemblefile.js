var assemble = require('assemble');

assemble.enable('minimal config');

assemble.task('html', function() {
  assemble.src(['templates/**/*.html'])
    .pipe(assemble.dest('dist/'));
});

assemble.task('public', function () {
  assemble.src(['public/**/*'])
    .pipe(assemble.dest('dist/'));
});

assemble.task('default', ['html', 'public']);
