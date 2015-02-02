var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('s', function() {
    browserSync({
        server: {
            baseDir: "./_site"
        },
        files: ['css/**', 'index.html', '_posts/**/*.md'],
        ghostMode: false
    });
});

/* BUILDING */
gulp.task('sass', function () {
    gulp.src('frontend/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(gulp.dest('_site/css'))
        .pipe(gulp.dest('css')) //print compiled sheet in two places so nothing gets left out of a build
        .pipe(reload({stream:true}));
    return true;
});


gulp.task('build', ['sass']);

gulp.task('watch', function() {
    gulp.watch('frontend/scss/**/*.scss', ['sass']);
});


gulp.task('default',['build', 'watch']);
