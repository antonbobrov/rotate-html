const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const preamble = require('./preamble');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, {

    mode: 'production',

    optimization: {
        minimize: true,
        concatenateModules: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_console: false,
                        keep_fargs: false,
                        passes: 2
                    },
                    ecma: 5,
                    mangle: true,
                    output: {
                        beautify: false,
                        comments: false,
                        preamble: preamble
                    }
                }
            })
        ],
        usedExports: true,
        sideEffects: true
    },

    plugins: [ ]

});

module.exports = new Promise((resolve) => {
    resolve(buildWebpackConfig);
});