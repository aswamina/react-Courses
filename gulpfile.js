"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect"); // Run a local dev server
var open = require("gulp-open"); // Open URL in web browser
var browserify = require("browserify"); // Bundles JS
var reactify = require("reactify"); // Transforms JSX to JS
var source = require("vinyl-source-stream"); // Use text streams with Gulp
var concat = require("gulp-concat"); // Concatenates files
var eslint = require("gulp-eslint"); // Lint JS files including JSX files
var nodemon = require('gulp-nodemon'); // Node server auto refresh

// Configurations
var config = {
    port: 5015,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.jsx',
        images: './src/images/*',
        mainjs: './src/main.jsx',
        serverjs: './src/server.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist'
    }
};

// Start a local dev server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

// Start a local node server to provide a catch all for routes to overcome problems using browserHistory in React
gulp.task('startServer', function () {
    var serverOptions = {
        script: './dist/server.js',
        delayTime: 0,
        env: {
            'PORT': 5015
        }
    };
    return nodemon(serverOptions)
        .on('restart', function (ev) {
            console.log('Restarting ....');
        });
});

// Open URL in web browser
gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html').pipe(open({
        uri: config.devBaseUrl + ":" + config.port + '/'
    }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainjs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());

    gulp.src(config.paths.serverjs)
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    gulp.src('./src/images/favicon*.png')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(eslint({
            configFile: 'eslint.config.json'
        }))
        .pipe(eslint.format());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.css, ['css']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('serve', ['html', 'css', 'js', 'images', 'open', 'watch']);
// gulp.task('serve', ['html', 'css', 'js', 'images', 'lint', 'open', 'watch']);
