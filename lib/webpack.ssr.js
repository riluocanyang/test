/**
 * webpack.ssr.js
 * 与webpack.prod.js基本是相同的，不同之处在于：
 * 1、css不解析，使用ignore-loader
 * 2、output添加libraryTarget
 *
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取为一个单独的文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const ssrConfig = {
    mode: 'production',
    output: {
        filename: '[name]-server.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader',
            },
            {
                test: /\.less$/,
                use: 'ignore-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HTMLWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                },

            ],
        }),
    ],
};

module.exports = merge(baseConfig, ssrConfig);
