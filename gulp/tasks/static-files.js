
var gulp =require('gulp');

gulp.task("static-files",function(){
    return gulp.src(['./www/**'])
        .pipe(gulp.dest("./dist/"));
});
