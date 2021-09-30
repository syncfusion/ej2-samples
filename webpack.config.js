var samplesList = [];
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var files = glob.sync('./src/**/sample.json', {
    silent: true
});
var fs = require('fs');
var sampleList;

if (fs.existsSync('./controlWiseSample.json')) {
    sampleList = JSON.parse(fs.readFileSync('./controlWiseSample.json'));
}

if (sampleList && sampleList.length) {
    files = getControlWiseBundle();
}
for (var inx = 0; inx < files.length; inx++) {
    samplesList.push(require(files[inx]));
}

function getControlWiseBundle() {
    var bundleList = JSON.parse(fs.readFileSync('./sampleList.json'));
    var controlWiseBundleList = [];
    for (var i = 0; i < bundleList.length; i++) {
        controlWiseBundleList.push('./src/' + bundleList[i] + '/sample.json');
    }
    return controlWiseBundleList;
}
// mode : (/hotfix\/|release\/|master/).test(process.env.BRANCH_NAME) ? 'production' : 'development',
module.exports = webpackConfig({
    mode: 'development',
    entry: {
        'src/common/index.min': './src/common/index'
    },
    devtool: false,
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'src/common.min',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: false
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: '[name].js'
    }
});

function webpackConfig(conf) {
    for (var i = 0; i < samplesList.length; i++) {
        var dirname = samplesList[i].directory;
        var samples = samplesList[i].samples;
        for (var j = 0; samples && j < samples.length; j++) {
            var entryPoint = 'src/' + dirname + '/' + samples[j].url;
            conf.entry['src/'+ dirname + '/' +samples[j].url] = './' + entryPoint;
        }
    }
    return conf;
}
