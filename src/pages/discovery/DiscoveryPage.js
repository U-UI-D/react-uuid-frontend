import React from "react";
import {Avatar} from "antd";
import {ALFlexBox, ALPlaceBox, ALComment} from "../../components/al-component";


class DiscoveryPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div className="primary-bg-color">
        <div className="content-width">
          <ALFlexBox between>
            <ALPlaceBox width={200} className="al-bg-color-white al-p-30px al-m-tb-30px">
              <div>列1</div>
            </ALPlaceBox>
            <ALPlaceBox width={600} className="al-bg-color-white  al-p-30px al-m-tb-30px" style={{overflow: "auto"}}>
              <div>
                <ALComment />

                <div>
                  <h2>关注的人的动态</h2>
                  <div>
                    <ALFlexBox>
                      <Avatar src={"https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar2.jpg"} />
                      <div>刚刚发布了作品</div>
                    </ALFlexBox>
                  </div>
                </div>
              </div>
            </ALPlaceBox>
            <ALPlaceBox width={340} className="al-bg-color-white  al-p-30px al-m-tb-30px">
              <div>列3</div>
            </ALPlaceBox>
          </ALFlexBox>
        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default DiscoveryPage;
