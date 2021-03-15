
// window is not defined， 需要做hack
if (typeof window === 'undefined') {
    global.window = {}
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')
const jsonData = require('../server/data.json')
// const html = require('../dist/search.html');  //报错
// console.log('template',template)

const server = (port) => {
    const app = express();
    app.use(express.static('dist'));

    app.get('/search', (req, res) => {
        // renderToString 返回的是字符串
        const html = renderMarkup(renderToString(SSR));
        res.status(200).send(html);
    })
    app.listen(port, () => {
        console.log('Server is running on port:' + port)
    })
}

server(process.env.port || 4098)


const renderMarkup = (str) => {
    const dataStr = JSON.stringify(jsonData)
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
            .replace('<!--INITIAL_DATA_PLACEHODLER-->',`<script>window.INITIAL_DATA = ${dataStr}</script>`)
}
