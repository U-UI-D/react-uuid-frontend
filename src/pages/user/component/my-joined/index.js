import React, {useEffect, useState} from "react";
import {Empty, Menu} from "antd";
import './style.scss';
import {UserContext} from "../../context/UserContext";
import {connect} from "react-redux";
import {HttpRequest} from "../../../../util/network/request";
import {ApiConst} from "../../../../util/network/config/ApiConst";
import ShowWorkBox from "../../../work/component/show-work-box/ShowWorkBox";
import {ALFlexBox} from "../../../../components/al-component";
import IconBox from "../../../material/component/icon-module/icon-box/IconBox";
import TopicListItem from "../../../topic/component/topic-list-item/TopicListItem";

function MyJoined(props) {
  const [current, setCurrent] = useState('ui');
  const [workUIData, setUIWorkData] = useState(null);
  const [workSoftwareData, setSoftwareWorkData] = useState(null);
  const [topicData, setTopicData] = useState(null);


  const getMyJoinUIWorkByUserId = () => {
    HttpRequest.get({
      url: ApiConst.work.common.get.GET_JOIN_WORK_BY_USER_ID + props.userInfo.id,
      env: 'dev'
    }).then(res => {
      if (res.err === null) {
        setUIWorkData(res.data.data);

        console.warn('workUIData res', res, workUIData);
      }
    })
  }


  const getSoftwareWorkByUserId = () => {
    HttpRequest.get({
      url: ApiConst.work.software.get.GET_BY_USER_ID + props.userInfo.id,
      env: 'dev'
    }).then(res => {
      if (res.err === null) {
        setSoftwareWorkData(res.data.data);

        console.warn('workSoftwareData res', res, workSoftwareData);
      }
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

  const handleClick = (e) => {
    setCurrent(e.key);
  }


  useEffect(() => {
    if (MyJoined) {
      getMyJoinUIWorkByUserId();
      getSoftwareWorkByUserId();
      getTopicListByUserId();
    }
  }, []);

  return (
    <UserContext.Consumer>
      {
        contextState => {
          const {userInfo, isMobile} = contextState;
          console.warn('workSoftwareData res2', workSoftwareData);

          return (
            <div className='my-published'>
              <Menu onClick={handleClick}
                    selectedKeys={current}
                    className='my-published-menu-style'
                    mode="horizontal">
                {
                  userInfo.identity == '1' ? (
                      <Menu.Item key="ui" >
                        UI作品({workUIData && workUIData.total || workUIData?.length || 0})
                      </Menu.Item>
                    ) : <></>
                }
                {
                  userInfo.identity == '2' ? (
                    <Menu.Item key="software">
                      软件作品({workSoftwareData && workSoftwareData.total || 0})
                    </Menu.Item>
                  ) : <></>
                }
                <Menu.Item key="topic">
                  话题({topicData && topicData.total || 0})
                </Menu.Item>
              </Menu>


              <div className='al-m-top-40px'>
                <div hidden={current !== 'ui'}>
                  <ALFlexBox wrap margin={isMobile ? 0 : -15}>
                    {/*{*/}
                    {/*  workUIData && workUIData.list.length > 0 ? workUIData.reverse().map((item, index) => {*/}
                    {/*    return (*/}
                    {/*      <React.Fragment key={index}>*/}
                    {/*        <ShowWorkBox workInfo={item} />*/}
                    {/*      </React.Fragment>*/}
                    {/*    );*/}
                    {/*  }) : <Empty />*/}
                    {/*}*/}
                  </ALFlexBox>
                </div>

                <div hidden={current !== 'software'}>
                  <ALFlexBox>
                    {/*{*/}
                    {/*  workSoftwareData ?*/}
                    {/*    workSoftwareData.list.map((item, index) => {*/}
                    {/*    return (*/}
                    {/*      <React.Fragment key={index}>*/}
                    {/*        <ShowWorkBox workInfo={item} />*/}
                    {/*      </React.Fragment>*/}
                    {/*    );*/}
                    {/*  }) : <Empty />*/}
                    {/*}*/}
                  </ALFlexBox>
                </div>

                <div hidden={current !== 'topic'}>
                  <ALFlexBox column>
                    {
                      topicData ? topicData.list.map((item, index) => {
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
                      }) : <Empty />
                    }
                  </ALFlexBox>
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

export default connect(mapStateToProps)(MyJoined);
