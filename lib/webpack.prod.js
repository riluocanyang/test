/**
 * webpack.prod.js
 * mode - 'production'
 * module -
 * 1、使用mini-css-extract-plugin将css提取为一个单独的文件，
 * 2、使用optimize-css-assets-webpack-plugin压缩css文件
 * 3、使用html-webpack-externals-plugin，第三方包不打入包中
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取为一个单独的文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
const HTMLWebpackExternalsPlugin = require('html-webpack-externals-plugin'); // 第三方库不打入包中
const baseConfig = require('./webpack.base');

const prodConfig = {
    // mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                // style-loader是将css引入到代码中
                // 而MiniCssExtractPlugin是将css单独提取出来
                // 因此他俩互斥

                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            // 1rem  = 75px
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                ],
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

module.exports = merge(baseConfig, prodConfig);
