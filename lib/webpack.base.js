/**
 * webpack.base.js
 * entry - 单入口/多入口
 * output - chunkhash
 * module - 解析ES6，图片，字体，
 * plugins - CleanWebpackPlugin, HtmlWebpackPlugin, FriendlyErrorsWebpackPlugin,
 *
 */

const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd();
console.log('projectRoot', projectRoot)
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    // const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        // const matchFileName = entryFile.match(/src\/(.*)\/(.*)\.js/)
        // output example:
        // [
        //     'src/index/index.js',
        //     'search',
        //     'index',
        //     index: 58,
        //     input: '/Users/apple/Documents/Study/Demo/Webpack/builder-webpack/src/search/
        //       index.js',
        // ]
        const matchFileName = entryFile.match(/src\/(.*)\/index\.js/);
        const filename = matchFileName && matchFileName[1];
        entry[filename] = entryFile;
        return htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                // template: path.join(__dirname, `src/${filename}/index.html`),
                template: path.join(projectRoot, `src/${filename}/index.html`),
                filename: `${filename}.html`,
                chunks: ['commons', filename],
                inject: true,
                minity: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: true,
                    minityCSS: true,
                    minityJS: true,
                    removeCommets: false,
                },

            }),
        );
    });

    return {
        entry,
        htmlWebpackPlugins,
    };
};
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
    entry,
    output: {
        // path.join 和 path.resolve 区别
        // path: path.resolve(__dirname, 'dist'), resolve相当于执行cd操作
        // path: path.join(__dirname, './dist'),
        path: path.join(projectRoot, './dist'),
        filename: '[name]_[chunkhash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // use: ['babel-loader'],
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(jpg|png|jepg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                            limit: 10240, // 10K
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
};
