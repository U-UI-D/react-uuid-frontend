import React from "react";
import {Route, HashRouter as Router, Link} from "react-router-dom";

export function Home(props) {
  return (
      <div>
        <h1>Home页面</h1>
        <ul>
          <li>
            <Link to="/passage-list">文章列表页</Link>
          </li>
          <li>
            <Link to="/about">关于页面</Link>
          </li>
        </ul>
        {props.children}
      </div>
  );
}

export function About(props) {
  return (
      <div>
        <h1>About页面</h1>
        <Link to="/">返回首页</Link>
      </div>
  );
}

export function PassgaeList(props) {
  return (
      <div>
        <h1>PassageList</h1>
        <h1>文章列表页面</h1>
        <ul>
          <li>
            <Link to="/passage-list/passage-detail/1">文章1</Link>
          </li>
          <li>
            <Link to="/passage-list/passage-detail/2">文章2</Link>
          </li>
        </ul>

        <br/>
        <Link to="/">返回首页</Link>
      </div>
  );
}

export function PassgaeDetail(props) {
  return (
      <div>
        <h1>PassgaeDetail</h1>
        <h1>文章详情页面，ID={props.match.params.id}</h1>

        <Link to="/passage-list">返回文章列表页</Link>
      </div>
  );
}

class TestRouter extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 渲染函数
  render() {
    return (
        <div>
          <Router>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/about">About</Link>

            <Route exact path="/" component={Home}>

            </Route>
            <Route path="/about" component={About}></Route>

            {/*嵌套路由*/}
            <Route path="/passage-list" component={PassgaeList}>

            </Route>
            <Route path="/passage-detail/:id" component={PassgaeDetail}></Route>
          </Router>
        </div>
    );
  }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {

  }

  //组件将要卸载时
  componentWillUnmount() {

  }


}

export default TestRouter;
