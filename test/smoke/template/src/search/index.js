import React from 'react';
import ReactDOM from 'react-dom';
import '../../common';
import './index.less';
import icon from './images/icon.jpg';
import logo from './images/logo.jpg';
// import icon from '../images/icon.jpg';  // 测试build error

class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }
    // 用箭头函数会报错
    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            })
        })
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
                Search Page watch webpack-dev-server2222222222
                <img src={icon} onClick={this.loadComponent.bind(this)} />
                <img src={logo} />
            </div>
        ) 
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)