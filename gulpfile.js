var glob = require('glob');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var shelljs = global.shelljs || require('shelljs');
var webpackGulp = require('webpack-stream');
var webpack = require('webpack');

gulp.task('scripts', function (done) {
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json', {
        typescript: require('typescript')
    });
    var srcLocation = ["./src/**/*.ts", "./spec/**/*.ts", "!./src/*/samples/**/*.ts", "!./src/node_modules/**/*.d.ts", "!./src/node_modules/**/*.ts"];
    var tsResult = gulp.src(srcLocation, {
        base: '.'
    })
        .pipe(ts(tsProject))
        .on('error', function (e) {
            done(e);
            process.exit(1);
        });
    tsResult.js
        .pipe(gulp.dest('./'))
        .on('error', function (e) {
            done(e);
            process.exit(1);
        })
        .on('end', function () {
            done();
        });
});

gulp.task('bundle', function (done) {
    var webpackConfig = require(fs.realpathSync('./webpack.config.js'));
    gulp.src('')
        .pipe(webpackGulp(webpackConfig, webpack))
        .pipe(gulp.dest('.'))
        .on('end', function () {
            done();
        })
        .on('error', function (e) {
            done(e);
            process.exit(1);
        });
});

gulp.task('whole-bundle', function (done) {
    if (shelljs.exec('node --max-old-space-size=7168 ./node_modules/gulp/bin/gulp.js bundle').code !== 0) {
        process.exit(1);
    } else {
        done();
    }
});

gulp.task('build', function(done){
    var runSequence = require('run-sequence');
    runSequence('scripts', 'whole-bundle', done);
})

gulp.task('serve', ['build'], function (done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential TypeScript');
    var options = {
        server: {
            baseDir: './'
        },
        ui: false
    };
    bs.init(options, done);
});


