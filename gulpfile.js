var glob = require('glob');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var shelljs = global.shelljs || require('shelljs');
var webpackGulp = require('webpack-stream');
var webpack = require('webpack');
var platform = 'typescript';
var sampleList;
var commonConfig = require('./config.json');

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
    runSequence('create-locale', 'scripts', 'whole-bundle', done);
})
var jsoncombine = require('gulp-jsoncombine');
var elasticlunr = require('elasticlunr');
var sampleOrder = '';
var sampleList;

gulp.task('combine-samplelists', function (done) {
    combineSampleList(platform, false, done);
});

function combineSampleList(platform, done) {
    var filename = platform === 'javascript' ? 'samplelist.js' : 'sampleList.ts';
    sampleOrder = JSON.parse(fs.readFileSync(`./src/common/sampleOrder.json`));
    var sampleListPath = `./src/common/`;
    if (sampleList && sampleList.length) {
        var controls = getControls();
        sampleOrder = getSampleOrder(controls);
    }
    return gulp.src(commonConfig.samplejson)
        .pipe(jsoncombine(`${filename}`, function (data) {
            var result = [];
            var subCategory = [];
            var intId = 0;
            var curDirectory = '';
            var addUID = function (pid, dt) {
                for (var i = 0; i < dt.length; i++) {
                    dt[i].uid = pid + i;
                    if (dt[i].hasOwnProperty('samples')) {
                        curDirectory = dt[i].directory;
                        subCategory = [];
                        addUID('00' + intId + i, dt[i].samples);
                        intId++;
                    } else {
                        var index = subCategory.indexOf(dt[i].category);
                        if (index !== -1) {
                            dt[i].order = index;
                        } else {
                            subCategory.push(dt[i].category);
                            dt[i].order = subCategory.length - 1;
                        }
                    }
                }
            };
            var orderKeys = Object.keys(sampleOrder);
            for (var i = 0; i < orderKeys.length; i++) {
                console.log('Category : ' + orderKeys[i]);
                var components = sampleOrder[orderKeys[i]];
                for (var j = 0; j < components.length; j++) {
                    console.log('Component : ' + components[j]);
                    var currentData = getSamples(data, components[j]);
                    currentData.order = i;
                    result.push(currentData);
                }
            }
            addUID('0', result);
            generateSearchIndex(result, sampleListPath, platform);
            var configProps = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
            var commonChunkSkip = configProps.cssComponent || [];
            var sList = `${platform === 'javascript' ?
                'window.samplesList  =' : 'export let samplesList : any ='}` + JSON.stringify(result) + ';\n\n' +
                `${platform === 'typescript' ? `\n\n export let skipCommonChunk: string[] = ${JSON.stringify(commonChunkSkip)};` : ''}`;
            return new Buffer(sList);

        }))
        .pipe(gulp.dest(sampleListPath))
}

function getSamples(data, component) {
    var dataList = Object.keys(data);
    for (var i = 0; i < dataList.length; i++) {
        var currentData = data[dataList[i]];
        if (component === currentData.name) {
            return currentData;
        }
    }
}

function generateSearchIndex(sampleArray, samplelistpath, platform) {
    var searchindexpath = platform === 'javascript' ? `${samplelistpath}search-index.js` :
        `${samplelistpath}search-index.json`;
    elasticlunr.clearStopWords();
    var instance = elasticlunr(function () {
        this.addField('component');
        this.addField('name');
        this.setRef('uid');
    });
    for (let sampleCollection of sampleArray) {
        var component = sampleCollection.name;
        var directory = sampleCollection.directory;
        var puid = sampleCollection.uid;
        var hideOnDevice = sampleCollection.hideOnDevice;
        for (let sample of sampleCollection.samples) {
            sample.component = component;
            sample.dir = directory;
            sample.parentId = puid;
            sample.hideOnDevice = hideOnDevice;
            instance.addDoc(sample);
        }
    }
    fs.writeFileSync(searchindexpath, `${platform === 'javascript' ? 'window.searchIndex  =' : ''}` + JSON.stringify(instance.toJSON()));
}

gulp.task('create-locale', function (done) {
    createLocale(platform, done);
});

function createLocale(platform, done) {
    var fileExt = platform === 'javascript' ? '.js' : '.ts';
    var localePath = `${platform === 'javascript' ? `./dist` : `./src/common`}`;
    if (!fs.existsSync(localePath)) {
        shelljs.mkdir('-p', localePath);
    }
    var localeJson = glob.sync('./src/**/locale.json', {
        silent: true
    });
    if (localeJson.length) {
        // baseUtil;
        var obj = {};
        for (var i = 0; i < localeJson.length; i++) {
            var compentLocale = JSON.parse(fs.readFileSync(localeJson[i]));
            obj = extend({}, obj, compentLocale, true);
        }
        fs.writeFileSync(`${localePath}/locale-string${fileExt}`,
            `${platform === 'javascript' ? 'window.Locale=' : 'export let Locale: Object='}` + JSON.stringify(obj) + ';');
        done();
    } else {
        fs.writeFileSync(`${localePath}/locale-string${fileExt}`,
            `${platform === 'javascript' ? 'window.Locale=' : 'export let Locale: Object={}'}`);
        done();
    }
}

function extend(copied, first, second, deep) {
    var result = copied || {};
    var length = arguments.length;
    if (deep) {
        length = length - 1;
    }
    var _loop_1 = function (i) {
        if (!arguments_1[i]) {
            return 'continue';
        }
        var obj1 = arguments_1[i];
        Object.keys(obj1).forEach(function (key) {
            var src = result[key];
            var copy = obj1[key];
            var clone;
            if (deep && isObject(copy)) {
                clone = isObject(src) ? src : {};
                result[key] = extend({}, clone, copy, true);
            }
            else {
                result[key] = copy;
            }
        });
    };
    var arguments_1 = arguments;
    for (var i = 1; i < length; i++) {
        _loop_1(i);
    }
    return result;
}

function isObject(obj) {
    var objCon = {};
    return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
}

 function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

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
