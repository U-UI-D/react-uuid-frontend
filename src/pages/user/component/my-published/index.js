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
import {RouterConst} from "../../../../util/router/config/RouterConst";
import TopicListItem from "../../../topic/component/topic-list-item/TopicListItem";

function MyPublished(props) {
  const [current, setCurrent] = useState('ui');
  const [workUIData, setUIWorkData] = useState(null);
  const [workSoftwareData, setSoftwareWorkData] = useState(null);
  const [topicData, setTopicData] = useState(null);

  const getUIWorkByUserId = () => {
    HttpRequest.get({
      url: ApiConst.work.ui.get.GET_BY_USER_ID + props.userInfo.id,
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

  const getTopicListByUserId = (pageNum=1, pageSize=3) => {
    HttpRequest.get({
      url: ApiConst.topic.get.GET_ALL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
      env: 'dev',
      // url: "http://localhost:9005/topic" + `?pageNum=${pageNum}&pageSize=${pageSize}`
    }).then(res => {
      console.log("setTopicData", res)
      setTopicData(res.data.data);
    }).catch(err => {

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
    if (MyPublished) {
      getUIWorkByUserId();
      getSoftwareWorkByUserId();
      getTopicListByUserId();
    }

  }, []);

  return (
    <UserContext.Consumer>
      {
        contextState => {
          const {userInfo, history} = contextState;
          return (
            <div className='my-published'>
              <Menu onClick={handleClick}
                    selectedKeys={current}
                    className='my-published-menu-style'
                    mode="horizontal">
                {
                  userInfo.identity == 1 ?
                  <Menu.Item key="ui">
                    UI作品({workUIData && workUIData.total})
                  </Menu.Item> :
                  <Menu.Item key="software">
                  软件作品({workSoftwareData && workSoftwareData.total})
                  </Menu.Item>
                }
                <Menu.Item key="topic">
                  话题({topicData && topicData.total})
                </Menu.Item>
                <Menu.Item key="material">
                  素材({3})
                </Menu.Item>
              </Menu>


              <div className='al-m-top-40px'>
                <div hidden={current !== 'ui'}>
                  <ALFlexBox wrap margin={-15}>
                    {
                      workUIData && workUIData.list.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <ShowWorkBox workInfo={item}
                                         onClick={() => {
                                           history.push({pathname: RouterConst.work.ui.DETAIL_PAGE + item.id});
                                         }}/>
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
                            <ShowWorkBox workInfo={item}/>
                          </React.Fragment>
                        );
                      })
                    }
                  </ALFlexBox>
                </div>

                <div hidden={current !== 'topic'}>
                  <ALFlexBox column>
                    {
                      topicData && topicData.list.map((item, index) => {
                        return (
                          <div key={index} style={{
                            backgroundColor: "#fff",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            marginBottom: "10px"
                          }}>
                            <TopicListItem data={item} history={props.history}/>
                          </div>
                        )
                      })
                    }
                  </ALFlexBox>
                </div>

                <div hidden={current !== 'material'}>
                  <IconBox/>
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

export default connect(mapStateToProps)(MyPublished);
