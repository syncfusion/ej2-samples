var glob = require('glob');
var webpack = require('webpack');

module.exports = webpackConfig({
    context: __dirname + '/',
    entry: { 'default.min': './default' },
    output: {
        path: __dirname + '/',
        filename: '[name].js',
        libraryTarget: 'this'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new webpack.optimize.CommonsChunkPlugin('default.min')
    ]
});

function webpackConfig(conf) {
    return conf;
}