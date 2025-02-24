const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const path = require('path');

const tsProject = ts.createProject('tsconfig.json');

// Clean dist directory
gulp.task('clean', () => {
    return del(['dist/**/*']);
});

// Compile TypeScript files
gulp.task('compile', () => {
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// Copy HTML files
gulp.task('copy-html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

// Watch for changes
gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', gulp.series('compile'));
    gulp.watch('src/**/*.html', gulp.series('copy-html'));
});

// Default task
gulp.task('default', gulp.series('clean', 'compile', 'copy-html'));
