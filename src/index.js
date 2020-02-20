import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Link,Route,Redirect} from 'react-router-dom'
// import {super} from "@babel/types";
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// 父级
class Demo extends React.Component{
    constructor(props){
        super(props) // 调用继承Component的构造函数
        // 构造函数 初始化数据，将要修改的数据，放到state中
        this.state = {
            time: new Date().toLocaleTimeString(),
            propNum: 999,
            childData: null
        }
    }
    // 生命周期函数，组件渲染完成后调用
    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: new Date().toLocaleTimeString()
            })
        }, 1000)

        // 改变propNum值
        this.setState({
            propNum: this.state.propNum / 3
        })
    }
    // btn(e) 第一种方式，需要绑定 btn 这个方法，在构造函数中，如： this.btn = this.btn.bind(this)
    // btn(e) {
    //     console.log(e.target)
    //     //btn为绑定this之前，会报错，要先绑定 btn 这个方法
    //     console.log(this.state.time)
    // }
    // btn(e) 第二种方式，箭头函数
    btn=(e)=> {
        console.log(e.target)
        console.log(this.state.time)
    }
    setChildData=(data)=>{
        this.setState({
            childData: data
        })
    }

    render() {
        return (
            <div>
                <h1>当前时间：{this.state.time}</h1>
                <button onClick={this.btn}>按钮</button>
                <p>从外部传入的值是：{this.props.infoNews}</p>
                <ChildDom propNum={this.state.propNum} setChildData={this.setChildData}/>
                <p>从子元素传到父元素的是：{this.state.childData}</p>
                <br />
                <h6>列表渲染</h6>
                <MapList />
                <br />
                <h6>简单的路由</h6>
                <InitRouter />
            </div>
        )
    }
}
// 子级
class ChildDom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg: 'hello father'
        }
    }

    // 调用父元素的函数从而操作父元素的数据，实现子传父
    sendData=()=>{
        this.props.setChildData(this.state.msg)
    }

    render() {
        // 条件渲染
        // if (true) {
        //     return (<div>1</div>)
        // } else {
        //     return (<div>2</div>)
        // }
        return (
            <div>
                <h6>这里是从父级传过来的值：{this.props.propNum}</h6>
                <br/>
                <button onClick={this.sendData}>数据 子传父 第一种方法</button>
                <br/>
                <button onClick={()=>{this.props.setChildData('直接调用props函数传参')}}>数据 子传父 第二种方法</button>
                <h6>传递子元素的数据 hello father 到父元素</h6>
            </div>
        )
    }
}

// 列表渲染
class MapList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mapList: [
                {
                    id:1,
                    value:'第1条'
                },
                {
                    id:2,
                    value:'第2条'
                },
                {
                    id:3,
                    value:'第3条'
                }
            ]
        }
    }
    render() {
        let getList = this.state.mapList.map((item, index)=> {
            return (
                <li key={index}>
                    <p>{item.id}</p>
                    <p>{item.value}</p>
                </li>
            )
        })
        let getList2 = this.state.mapList.map((item, index)=> {
            return (
                <SetItem key={index} data={item} index={index}/>
                )
        })
        return (
            <div>
                <p>第一种，不常用</p>
                <ul>
                    {getList}
                </ul>
                <p>第二种，常用</p>
                <ul>
                    {getList2}
                </ul>
            </div>
        )
    }
}
// 封装需要循环的数据
class SetItem extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <li onClick={()=>{this.show(this.props.data)}}>
                <p>{this.props.data.id}</p>
                <p>{this.props.data.value}</p>
            </li>
        )
    }
    show=(data)=>{
        alert(data.id+":"+data.value)
    }
}

function Home() {
    return (<h1>首页</h1>)
}
class Product extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h1>Product</h1>
                <button onClick={this.goBack}>返回首页</button>
            </div>
        );
    }
    goBack=()=>{
        this.props.history.go(-1) // 后退
        // this.props.history.push('/',{msg: '给首页的数据'})
    }
}
function Info() {
    return (<h1>Info</h1>)
}
function News(props) {
    console.log(props)
    return (<h1>获取的id是：{props.match.params.id}</h1>)
}
// 路由
class InitRouter extends React.Component{
    render() {
        let msg = {pathname: '/info',search:'id:1'}
        return (
            <div id="app">
                <Router>
                    <div>
                        <Link to="/">首页</Link>
                        <Link to="/product">列表</Link>
                        <Link to={ msg }>详情</Link>
                        <Link to="/News/9243">详情</Link>
                    </div>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/product" component={Product}></Route>
                    <Route path="/info" component={Info}></Route>
                    <Route path="/News/:id" component={News}></Route>
                </Router>
            </div>
        )
    }
}
// 路由重定向,使用组件
{/*<Redirect to="/info"></Redirect>*/}

ReactDOM.render(<Demo infoNews="我是外面传入的值"/>,document.getElementById('root'))
