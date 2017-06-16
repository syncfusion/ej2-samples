'use strict';

var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var webpackGulp = require('webpack-stream');

/**
 * Compile script files
 */
gulp.task('scripts', function(done) {
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });
    var tsResult = gulp.src(['./src/**/*.ts', './spec/**/*.ts'], { base: '.' })
        .pipe(tsProject());        
    tsResult.js
        .pipe(gulp.dest('./'))
        .on('end', function() {
            done();
        });
});

/**
 * Compile scss files
 */
gulp.task('styles', function() {
    var sass = require('gulp-sass');
    return gulp.src(['./styles/**/*.scss'], { base: './' })
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: './node_modules/@syncfusion/'
        }))
        .pipe(gulp.dest('.'));
});

/**
 * Bundle all module using webpack
 */
gulp.task('bundle', function() {
    var webpackConfig = require(fs.realpathSync('./webpack.config.js'));
    return gulp.src('')
        .pipe(webpackGulp(webpackConfig, webpack))
        .pipe(gulp.dest('.'));
});

/**
 * Bundle showcase using webpack
 */
gulp.task('bundle-showcase', function() {
    var webpackConfig = require(fs.realpathSync('./src/showcase/expense/webpack.config.js'));
    return gulp.src('')
        .pipe(webpackGulp(webpackConfig, webpack))
        .pipe(gulp.dest('./src/showcase/expense/'));
});

/**
 * Build ts and scss files
 */
gulp.task('build', function(done) {
    var runSequence = require('run-sequence');
    runSequence('scripts', 'styles', 'bundle', 'bundle-showcase', done);
});

/**
 * Run test for samplebrowser
 */
gulp.task('test', function(done) {
    var karma = require('karma');
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['Chrome'],
        browserNoActivityTimeout: 30000
    }, function(e) {
        done(e === 0 ? null : 'karma exited with status ' + e);
    }).start();
});

/**
 * Load the samples
 */
gulp.task('serve', ['build'], function (done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2');
    var options = {
        server: {
            baseDir: './'
        },
        ui: false
    };
    bs.init(options, done);
});