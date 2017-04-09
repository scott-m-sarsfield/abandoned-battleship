var gulp =require('gulp');

var mocha = require('gulp-mocha');

var notifierReporter = require('mocha-notifier-reporter');

gulp.task('mocha',function(){
    return gulp.src(['./test/*.js'],{read:false})
        .pipe(mocha({reporter:notifierReporter.decorate('spec')}));
});
