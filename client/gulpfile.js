const gulp = require('gulp');
const webserver = require('gulp-webserver');
 
gulp.task('default', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
