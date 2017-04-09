var gulp = require('gulp');
var argv = require('yargs').argv;


gulp.task('copy',function(){
    //console.log(argv);
    //var destination = argv.dest || argv.d;
    if(!argv.dest){
        console.log("Usage:\ngulp copy --dest <destination>");
    }else{
        return gulp.src(['./**','!./node_modules/**','.babelrc'])
            .pipe(gulp.dest(argv.dest));
    }
});
