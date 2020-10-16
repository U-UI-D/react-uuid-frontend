import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import IconBox from "./component/icon-module/icon-box/IconBox";
import PosterBox from "./component/icon-module/poster-box/PosterBox";
import IllustrationBox from "./component/icon-module/illustration-box/IllustrationBox";
import AlbumBox from "./component/icon-module/album-box/AlbumBox";




class MaterialPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  //渲染函数
  render() {
    return (
      <div className="primary-bg-color">
        <div className="content-width al-p-tb-30px">
          <div className="al-m-tb-20px">
            <h2>icon</h2>
            <div>
              <IconBox />
            </div>
          </div>


          <div className="al-m-tb-20px">
            <h2>图册</h2>
            <div>
              <AlbumBox />
            </div>
          </div>

          <div className="al-m-tb-20px">
            <h2>海报</h2>
            <div>
              <PosterBox />
            </div>
          </div>

          <div className="al-m-tb-20px">
            <h2>插画</h2>
            <div>
              <IllustrationBox />
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
