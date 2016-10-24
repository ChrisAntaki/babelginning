// Modules
const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const precss = require('precss');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const webserver = require('gulp-webserver');


gulp.task('default', ['scripts', 'styles', 'watch', 'webserver']);

gulp.task('scripts', () => {
    gulp.src('scripts/index.js')
        .pipe(plumber())
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        test: /\.jsx?$/,
                    },
                ],
            },
            resolve: {
                extensions: ['', '.js', '.jsx'],
            },
            watch: true,
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', () => {
    gulp.src('styles/index.css')
        .pipe(plumber())
        .pipe(postcss([
            precss,
            autoprefixer,
        ]))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('webserver', () => {
    gulp.src('dist')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true,
        }));
});

gulp.task('watch', () => {
    gulp.watch('styles/*', ['styles']);
});
