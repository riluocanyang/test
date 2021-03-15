// import React from 'react';
// import ReactDOM from 'react-dom';
// import icon from './images/icon.jpg';
// import logo from './images/logo.jpg';
// import '../../common';
// import './index.less';

// 因为导出的时候是使用的module.exports, 所有在引入是需要使用require
const React  = require('react');
const icon  = require('./images/icon.jpg');
const logo = require('./images/logo.jpg');
require('../../common');
require('./index.less');
console.log('icon', icon)  // Object [Module] { default: 'icon_55bd4ddd.jpg' }


class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }
    // 用箭头函数会报错
    loadComponent () {
        console.log('res')
        require('./text.js').then((text) => {
            console.log(text)
        })
        // require('./text.js').then((Text) => {
        //     this.setState({
        //         Text: Text.default
        //     })
        // })
    }
    render() {
        const { Text }  = this.state;
        return (
            <div className="search-test">
                {/* 
                    组件渲染时需要为<Text /> 而不是 Text
                    Text ? Text : null 渲染不出来
                */}
                
                {
                    Text ? <Text />: null
                }
                Search Page watch webpack-dev-server22222
                <img src={icon.default} onClick={this.loadComponent} />
                <img src={logo.default} />
            </div>
        ) 
    }
}

// ReactDOM.render(
//     <Search />,
//     document.getElementById('root')
// )

// 在服务端是不能使用ReactDOM.render方法的，会报错，可以使用common.js 语法，即module.exports

module.exports = <Search />;