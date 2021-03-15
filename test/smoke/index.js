const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms',
});
// const prodConfig = require('../../lib/webpack.prod');
// 通过chdir进入到某一个目录
process.chdir(path.join(__dirname, 'template'));
// 每次创建之前需要删除template目录下的dist文件，需要安装rimraf库
// 执行npm i rimraf -D

rimraf('./dist', () => {
    // eslint-disable-next-line global-require
    const config = require('../../lib/webpack.prod');
    // const config = prodConfig;
    console.log('config', config)
    webpack(config, (error, stats) => {
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            process.exit(2);
        }
        // eslint-disable-next-line no-console
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
        }));

        console.log('webpack build success, start run test');

        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'js-css-test.js'));
        mocha.run();
    });
});
