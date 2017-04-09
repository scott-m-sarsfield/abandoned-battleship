/* eslint-env node */

var gulp =require('gulp');

var mocha = require('gulp-mocha');

var notifierReporter = require('mocha-notifier-reporter');

gulp.task('mocha',function(){
    return gulp.src(['**/__tests__/*.spec.js'],{read:false})
        .pipe(mocha({
            reporter:notifierReporter.decorate('spec'),
            compilers:[
                'js:babel-core/register'
            ]
        }));
});
