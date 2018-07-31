var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');

// scripts tasks (uglifies)
gulp.task('scripts', () => {
    gulp.src('src/js/index.js')
        .pipe(uglify())
        .on('error', (err) => { console.log(err.message) })
        .pipe(gulp.dest('dist/js'));
});

// styles tasks
gulp.task('styles', () => {
    return sass('src/scss/*.scss')
        .on('error', (err) => { console.log(err.message) })
        .pipe(gulp.dest('src/css/'))
        .pipe(livereload());
});

// watch tasks (watches for js changes to rebuild js)
gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);