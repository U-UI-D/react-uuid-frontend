import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import {Avatar} from "antd";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";
import IconModule from "./component/icon-module/IconModule";

function ImgBgBox(props){
  let boxSize = {width: props.width + 'px', height: props.height + 'px'}
  return (
    <div className="al-position-rela al-m-bottom-10px al-hover-shadow-black-30 al-cursor-pointer primary-border-radius"
         style={boxSize}>
      <span className="primary-border-radius">
        <Avatar
            src={props.data.poster}
            style={{width: props.width + 'px', height: '264px', borderRadius: 10+'px'}}
            shape="square"/>
      </span>

      <div className="al-position-abs al-mask-black-30 primary-border-radius"
           style={{top: 0, bottom: 0, left: 0, right: 0}} />
      <div className="al-position-abs" style={{top: 0}}>
        <div style={boxSize}
             className="al-flex-container-center-vh">
          <h1 className="al-text-color-white">{props.data.title}</h1>
        </div>
      </div>
    </div>
  )
}


class MaterialPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      imageList: [
        {
          title: "秋叶",
          poster: "https://ali.image.hellorf.com/images/682ccd2b82519cde5d416c7c932b1788.jpeg?x-oss-process=image/resize,h_528"
        },
        {
          title: "二十四节气-白露",
          poster: "https://ali.image.hellorf.com/images/b67f4625727fa2ae45000452c0258253.jpeg?x-oss-process=image/resize,h_528"
        },
        {
          title: "老师",
          poster: "https://ali.image.hellorf.com/images/5bbf7f91a22277045db4772a017c815c.jpeg?x-oss-process=image/resize,h_528"
        },
        {
          title: "运动拉伸",
          poster: "https://ali.image.hellorf.com/images/e141926a59531dbf166d503fb58edeb0.jpeg?x-oss-process=image/resize,h_528"
        },
        {
          title: "间隔年",
          poster: "https://ali.image.hellorf.com/images/cf98d9c4247bea8737c8e742401665b1.jpeg?x-oss-process=image/resize,h_528"
        },
        {
          title: "影子",
          poster: "https://ali.image.hellorf.com/images/6782eeee79505f452eff95d9d395f944.jpeg?x-oss-process=image/resize,h_528"
        },
        {
          title: "花莲",
          poster: "https://ali.image.hellorf.com/images/2db5c64fefc4b14df9ab7ced4a588392.jpeg?x-oss-process=image/resize,h_528"
        }
      ]
    }
  }

  //渲染函数
  render() {




    return (
      <div className="primary-bg-color">
        <div className="al-bg-color-white">
          <ALHeader/>
        </div>

        <div className="content-width al-p-tb-30px">
          <div className="al-m-tb-20px">
            <h2>icon</h2>
            <div>
              <IconModule />
            </div>
          </div>


          <div className="al-m-tb-20px">
            <h2>图册</h2>
            <div>
              <ALFlexBox wrap between>
                {
                  this.state.imageList.map((item, index) => {
                    return <div key={index}>
                      <ImgBgBox data={item}
                                width={(index === 1) || (index === 2) ? 777 : 373}
                                height={264} />
                    </div>
                  })
                }
              </ALFlexBox>
            </div>
          </div>

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

export default MaterialPage;
