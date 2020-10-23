import React, {useState} from "react";
import "./style.css";

function TitleList(props) {
  let titleList = ['全部', 'UI作品', '软件作品'];
  const [enterLiTag, setEnterLiTag] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('全部');
  const [hoverTitle, setHoverTitle] = useState('');

  let uiWorkTitleList = ['全部', '最新作品', '佳作分享', '即刻作品', '网站', 'APP', '小程序'];
  let softwareWorkTitleList = ['全部', '成品', '开发中'];

  let subTitle = () => {
    switch (hoverTitle) {
      case "UI作品":
        return (
          <ul className="title-list">
            {
              uiWorkTitleList.map((item, index) => {
                return(
                  <li key={index} onClick={() => {
                    setCurrentTitle(hoverTitle);
                    props.onChange({firstTitle: hoverTitle, secondTitle: item});
                  }}>{item}</li>
                )
              })
            }
          </ul>
        );
      case "软件作品":
        return (
          <ul className="title-list">
            {
              softwareWorkTitleList.map((item, index) => {
                return(
                  <li key={index} onClick={() => {
                    setCurrentTitle(hoverTitle);
                    props.onChange({firstTitle: hoverTitle, secondTitle: item});
                  }}>{item}</li>
                )
              })
            }
          </ul>
        );

      default: break;
    }
  }
  return (
    <div>
      <div className="al-bg-color-white" id="title-list">
        {/*标题*/}
        <div className="content-width">
          <ul className="title-list">
            {
              titleList.map((item, index) => {
                return (
                  <li onMouseEnter={() => {
                        setEnterLiTag(true);
                        setHoverTitle(item)
                      }}
                      onMouseLeave={() => setEnterLiTag(false)}
                      key={index}
                      onClick={() => setCurrentTitle(item)}>
                    <span style={{color: currentTitle === item ? '#1890ff' : ''}}>
                      {item}
                    </span>
                  </li>
                );
              })
            }
          </ul>
        </div>

        {
          enterLiTag ?
            (
              <div className="sub-title-list"
                   onMouseEnter={() => setEnterLiTag(true)}
                   onMouseLeave={() => setEnterLiTag(false)}>
                <div className="content-width">
                  {subTitle()}
                </div>
              </div>
            ) : ""
        }
      </div>
    </div>
  );
}

export default TitleList;
