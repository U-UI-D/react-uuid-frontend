import React, {useState} from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import {LOGIN} from "../../../../util/router/config/RouterConst";


class WorkPublish extends React.Component{
  constructor(props) {
    super();
    this.state = {
      workData: null,
    }
  }

  componentDidMount() {
    let isLogin = localStorage.getItem("isLogin");
    if (!isLogin){
      this.goPage(LOGIN, {fromPath: '/work/publish'});
      return;
    }
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  render() {
    return (
      <div>
        <ALHeader />
        发布作品页面
      </div>
    );
  }
}



export default WorkPublish;
