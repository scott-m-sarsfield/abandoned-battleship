var gulp =require('gulp');


var mustache = require('gulp-mustache');
var ext_replace = require('gulp-ext-replace');
var prettify = require('gulp-html-prettify');


gulp.task('renderStatic',function(){

    // this is probably dumb.
    Object.keys(require.cache).forEach(function(key) {
         if(!key.match(/node_modules/)){    // only want to delete the require cache for my files.
             console.log(key);
             delete require.cache[key];
         }
     });

    try{
        var staticReactContent = require('../util/static_react').default;
    return gulp.src('./templates/*.mustache')
        .pipe(mustache(staticReactContent))
        .pipe(ext_replace(".html"))
        .pipe(prettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('./dist'));
    }catch(e){
        console.log(e.stack);
    }
});
