var gulp = require('gulp');

var notify = require('gulp-notify');

gulp.task('notify',function(){
    return gulp.src(['./src/**'])
        .pipe(notify("Hello Gulp!"));
});
