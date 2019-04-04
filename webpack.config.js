var samplesList = [];
var glob = require('glob');
var webpack = require('webpack');
var files = glob.sync('./src/**/sample.json', { silent: true });
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
    var bundleList = JSON.parse(fs.readFileSync('./src/common/sampleList.json'));
    var controlWiseBundleList = [];
    for (var i = 0; i < bundleList.length; i++) {
        controlWiseBundleList.push('./src/' + bundleList[i] + '/sample.json');
    }
    return controlWiseBundleList;
}
module.exports = webpackConfig({
    context: __dirname + '/',
    entry: { 'src/common/index.min': './src/common/index' },
    output: {
        path: __dirname + '/',
        filename: '[name].js',
        libraryTarget: 'this'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('src/common.min')
    ]
});

function webpackConfig(conf) {
    for (var i = 0; i < samplesList.length; i++) {
        var dirname = samplesList[i].directory;
        var samples = samplesList[i].samples;
        var subSamples = [];
        for (var j = 0; samples && j < samples.length; j++) {
            var entryPoint = 'src/' + dirname + '/' + samples[j].url;
            conf.entry[entryPoint] = './' + entryPoint;
            subSamples.push(entryPoint);
        }
        conf.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: "src/" + dirname + '/common',
                chunks: subSamples
            })
        );
    }
    return conf;
}