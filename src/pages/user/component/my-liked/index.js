import React, {useEffect, useState} from "react";
import {Menu} from "antd";
import './style.scss';
import {UserContext} from "../../context/UserContext";
import {connect} from "react-redux";
import {HttpRequest} from "../../../../util/network/request";
import {ApiConst} from "../../../../util/network/config/ApiConst";
import ShowWorkBox from "../../../work/component/show-work-box/ShowWorkBox";
import {ALFlexBox} from "../../../../components/al-component";
import IconBox from "../../../material/component/icon-module/icon-box/IconBox";

function MyLiked(props) {
  const [current, setCurrent] = useState('ui');
  const [workUIData, setUIWorkData] = useState(null);
  const [workSoftwareData, setSoftwareWorkData] = useState(null);

  const getUIWorkByUserId = () => {
    HttpRequest.get({
      url: ApiConst.work.ui.get.GET_LIKED_BY_USER_ID + props.userInfo.id,
      env: 'dev'
    }).then(res => {
      setUIWorkData(res.data.data);
    })
  }


  const getSoftwareWorkByUserId = () => {
    HttpRequest.get({
      url: ApiConst.work.software.get.GET_BY_USER_ID + props.userInfo.id,
      env: 'dev'
    }).then(res => {
      setSoftwareWorkData(res.data.data);
    })
  }

  const getMaterial = () => {
    // HttpRequest.get({
    //   url: ApiConst.work.ui.get.GET_BY_USER_ID + props.userInfo.id,
    // }).then(res => {
    //   setWorkData(res.data.data);
    //   console.log("workData", workData);
    // })

    setTimeout(() => {
      // setWorkData(res.data.data);
    }, 500);
  }

  const handleClick = (e) => {
    setCurrent(e.key);
  }


  useEffect(() => {
    getUIWorkByUserId();
    getSoftwareWorkByUserId();
  }, []);

  return (
    <UserContext.Consumer>
      {
        contextState => {
          const {userInfo} = contextState;
          return (
            <div className='my-published'>
              <Menu onClick={handleClick}
                    selectedKeys={current}
                    className='my-published-menu-style'
                    mode="horizontal">
                <Menu.Item key="ui" >
                  UI作品({workUIData && workUIData.total || workUIData?.length})
                </Menu.Item>
                <Menu.Item key="software">
                  软件作品({workSoftwareData && workSoftwareData.total})
                </Menu.Item>
                <Menu.Item key="material">
                  素材({3})
                </Menu.Item>
              </Menu>


              <div className='al-m-top-40px'>
                <div hidden={current !== 'ui'}>
                  <ALFlexBox wrap margin={-15}>
                    {
                      workUIData && workUIData.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <ShowWorkBox workInfo={item} />
                          </React.Fragment>
                        );
                      })
                    }
                  </ALFlexBox>
                </div>

                <div hidden={current !== 'software'}>
                  <ALFlexBox>
                    {
                      workSoftwareData && workSoftwareData.list.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <ShowWorkBox workInfo={item} />
                          </React.Fragment>
                        );
                      })
                    }
                  </ALFlexBox>
                </div>

                <div hidden={current !== 'material'}>
                  <IconBox />
                </div>
              </div>
            </div>
          );
        }
      }
    </UserContext.Consumer>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(MyLiked);
