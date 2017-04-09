var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('javascript',function(){
    var b = browserify({
        entries:"./src/app.js",
        debug:true
    });

    return b.transform(babelify).bundle()
        .pipe(source('app.js')) // app.js is a pretend file name, BTW
        .pipe(buffer())
        .pipe(gulp.dest('./dist/js/'));
});
