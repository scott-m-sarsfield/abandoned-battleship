var gulp = require('gulp');

gulp.task('default',['mocha','javascript','static-files','renderStatic','browserSync'],function(){
    gulp.watch(['www/**'],['static-files']);
    gulp.watch(['templates/**','src/**'],[/*'renderStatic',*/'javascript']);
    gulp.watch(['src/**','test/**'],['mocha']);
});
