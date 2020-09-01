import React, {useState} from "react";
import {getUserInfoFromLocalStorage} from "../../../../util/util";
import {Avatar} from "antd";
import ALLoading from "../../../../components/al-loading/ALLoading";
import BaseInfoTabCard from "./component/BaseInfoTabCard";
import ExtensionInfoTabCard from "./component/ExtensionInfoTabCard";
import AuthTabCard from "./component/AuthTabCard";
import AccountSecurityTabCard from "./component/AccountSecurityTabCard";

let initItemArr = [
  {
    title: '个人资料',
    on: true
  },
  {
    title: '扩展资料',
    on: false
  },
  {
    title: '账户安全',
    on: false
  },
  {
    title: '身份认证',
    on: false
  },
];

function Header({userInfo}) {

  return (
    <div className="al-flex-container al-flex-container-center-v content-width">
      <Avatar src={require("../../../../assets/icon/common/UUID2.png")} size={70}/>

      <div id="header-menu"
           className="al-flex-container-center-vh al-flex-justify-space-between"
           style={{flex: 1}}>
        <h2 className="al-m-left-20px">帐户中心</h2>


        <div className="al-flex-container">
          {
            userInfo === null ? <div></div> :
              <div>
                <Avatar src={userInfo.avatar} />
                <span className="al-p-lr-20px">{userInfo.nickname}</span>
                <a className="al-p-left-20px"
                   style={{borderLeft: "solid 0.5px #ddd"}}
                   onClick={() => {window.history.go(-1)}}>
                  返回
                </a>
              </div>

            // <div>头像</div>
          }
        </div>
      </div>
    </div>
  );
}

function Content(){
  const [itemArr, setItemArr] = useState(initItemArr);
  const [currentTitle, setCurrentTitle] = useState('个人资料');

  const LayoutLeft = () => {

    return (
        <div style={{backgroundColor: "#f6f6f6"}}>
          {
            itemArr.map((item, index) => {
              return(
                  <div key={item.title}
                       style={{width: 130+'px',
                         height: 125+'px',
                         backgroundColor: item.title === currentTitle ? '#fff' : '',
                         borderLeft: item.title === currentTitle ? 'solid 2px #00b0ff': ''
                       }}
                       className="al-flex-container-center-vh al-cursor-pointer"
                       onClick={() => {
                         setCurrentTitle(item.title);
                       }}
                  >
                    {item.title}
                  </div>
              )
            })
          }

        </div>
    )
  }

  const LayoutRight = ({currentTitle}) => {
    let [title, setTitle] = useState(currentTitle);
    function SwitchCard({title}) {
      switch (title) {
        case initItemArr[0].title:
          return <BaseInfoTabCard />;
        case initItemArr[1].title:
          return <ExtensionInfoTabCard />;
        case initItemArr[2].title:
          return <AccountSecurityTabCard />;
        case initItemArr[3].title:
          return <AuthTabCard />;
        default:
          return <div></div>
      }
    }

    return (
        <div >
          <SwitchCard title={title} />
        </div>
    )
  }

  return(
    <>
      <div className="al-flex-container al-p-tb-20px">
        <div>
          <LayoutLeft />
        </div>
        <div style={{flexGrow: 1}}
             className="al-p-40px al-bg-color-white">
          <LayoutRight currentTitle={currentTitle} />
        </div>
      </div>
    </>
  );
}

class UserProfilePage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null
    }
  }

  //渲染函数
  render() {
    return this.state.userInfo === null ? <ALLoading show /> : (
      <div style={{backgroundColor: "#efefef"}}>
        <div>

          <div style={{backgroundColor: "#fff"}}>
            <Header userInfo={this.state.userInfo} />
          </div>

          <div className="content-width" >
            <Content />
          </div>



        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let userInfo = getUserInfoFromLocalStorage()
    this.setState({
      userInfo: userInfo
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default UserProfilePage;
