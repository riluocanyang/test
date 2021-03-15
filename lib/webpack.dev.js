/**
 * webpack.dev.js
 * mode - 'development'
 * module - css, less,
 * devtool,
 * devServer
 */

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {

    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],

    },
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only',
    },
    devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
