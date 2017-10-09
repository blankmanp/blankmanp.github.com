const gulp = require('gulp');
const config = require('config');
const _ = require('lodash');
const less = require('gulp-less');

gulp.task('default', ['build:less', 'watch:less'])

gulp.task('build:less', () => {
    gulp.src(`${config.less}/**/*`)
        .pipe(less())
        .pipe(gulp.dest(`${config.assets}/styles`));
});

gulp.task('watch:less', () => {
    gulp.watch(`${config.less}/**/*`);
});