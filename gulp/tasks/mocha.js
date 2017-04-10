/* eslint-env node */

var gulp =require('gulp');

var mocha = require('gulp-mocha');

var notifierReporter = require('mocha-notifier-reporter');

var TEST_FILES = '**/__tests__/*.spec.js';
var JS_FILES = 'src/**/*.js';

function handleError(/* err */){
    //console.log(err.toString()); // eslint-disable-line
    this.emit('end');
}

gulp.task('mocha',function(){
    return gulp.src([TEST_FILES],{read:false})
        .pipe(mocha({
            reporter:notifierReporter.decorate('spec'),
            compilers:[
                'js:babel-core/register'
            ]
        }))
        .on("error",handleError);
});

gulp.task('watch-test',['mocha'],function(){
    gulp.watch([JS_FILES],['mocha']);
});
