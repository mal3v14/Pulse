const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const del = require('del');

// Сервер для разработки
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Компиляция SASS
gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Вотчер
gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});

// Очистка папки docs
gulp.task('clean', function () {
    return del('docs');
});

// Копирование файлов в папку docs (для GitHub Pages)
gulp.task('build', gulp.series('clean', 'styles', function () {
    return gulp.src([
        'src/*.html',
        'src/css/**/*',
        'src/js/**/*',
        'src/img/**/*',
        'src/fonts/**/*',
        'src/icons/**/*'

    ], { base: 'src' })
        .pipe(gulp.dest('docs'));
}));

// По умолчанию
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
