import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import {Avatar} from "antd";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";

function ImgBgBox(props){
  return (
    <div className="al-position-rela al-hover-shadow-black-30 al-cursor-pointer al-hover-transform-scale-1-1"
         style={{width: 352 + 'px', height: 264 + 'px'}}>
      <Avatar
        src={props.data.poster}
        style={{width: 352 + 'px', height: '264px'}}
        shape="square"/>
      <div className="al-position-abs al-mask-black-30"
           style={{top: 0, bottom: 0, left: 0, right: 0}} />
      <div className="al-position-abs" style={{top: 0}}>
        <div style={{width: 352 + 'px', height: '264px'}}
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
          <h2>icon</h2>
          <h2>海报</h2>


          <div>
            <h2>图片</h2>
            <ALFlexBox wrap>
              {
                this.state.imageList.map((item, index) => {
                  return <div key={index} className="al-m-right-10px">
                    <ImgBgBox data={item} />
                  </div>
                })
              }
            </ALFlexBox>
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
