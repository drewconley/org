var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var run = require('gulp-run');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('s', function() {
    browserSync({
        server: {
            baseDir: "./_site"
        },
        files: ['css/**', '_site/**/*.html'],
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
        .pipe(gulp.dest('_site/css'))
        .pipe(gulp.dest('css')) //print compiled sheet in two places so nothing gets left out of a build
        .pipe(reload({stream:true}));
    return true;
});

gulp.task('jekyll', function() {
    run('jekyll build').exec();
});


gulp.task('build', ['sass', 'jekyll']);

gulp.task('watch', function() {
    gulp.watch('frontend/scss/**/*.scss', ['sass']);
    gulp.watch(['_posts/**/*.html', 'index.html'], ['jekyll']);
});


gulp.task('default',['build', 'watch']);
