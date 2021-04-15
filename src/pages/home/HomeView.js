import {Affix, Menu, Pagination} from "antd";
import ShowCarousel from "./component/show-carousel/ShowCarousel";
import {ALFlexBox, ALLoading, ALPlaceBox} from "../../components/al-component";
import {RouterConst} from "../../util/router/config/RouterConst";
import ShowWorkBox from "../work/component/show-work-box/ShowWorkBox";
import ShowDesigner from "./component/show-designer/ShowDesigner";
import React from "react";

export default function (props){
  const {isMobile, history, total, currentPageNum, currentPageSize, showTitleBoxShadow, workData} = props;
  const {handleTitleChange, getWorkData, handlePageChange} = props;

  const MenuItem = Menu.Item;

  return (
    <div className="home-page">
      {/*上半部分*/}
      <div className="al-bg-color-white">
        <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
          {/*轮播图*/}
          <ShowCarousel history={history} />
        </div>

        {/*标题*/}
        <Affix offsetTop={0} onChange={handleTitleChange}>
          <div id="index-menu-title"
               className={`al-bg-color-white ${showTitleBoxShadow ? 'al-box-shadow' : ''}`}>
            <Menu mode="horizontal" defaultSelectedKeys={["index"]}>
              <MenuItem key={"index"} onClick={() => {getWorkData('look_count')}}>首页推荐</MenuItem>
              <MenuItem key={"lasted"} onClick={() => {getWorkData('created_time')}}>最新作品</MenuItem>
            </Menu>
          </div>
        </Affix>
      </div>

      {/*作品列表*/}
      <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
        {/*作品列表*/}
        <ALPlaceBox height={20}/>
        <div style={{marginLeft: isMobile ? null : "15px"}}>
          {
            workData === null ?
              <ALLoading show height={200}/>
              :
              <ALFlexBox centerVH={isMobile} wrap margin={isMobile ? 0 : -15}>
                {
                  workData.list.map((item, index) => {
                    return (
                      <div key={index} onClick={() => {
                        history.push(RouterConst.work.ui.DETAIL_PAGE + item.id)
                      }} className={`${isMobile ? "al-width-96" : ""}`}>
                        <ShowWorkBox workInfo={item}/>
                      </div>
                    )
                  })
                }
              </ALFlexBox>
          }

          {/*分页*/}
          <ALFlexBox centerH className="al-m-tb-20px">
            <Pagination current={currentPageNum}
                        total={total}
                        defaultPageSize={currentPageSize}
                        pageSizeOptions={["20", "40", "60", "80", "100"]}
                        hideOnSinglePage
                        onShowSizeChange={handlePageChange}
                        onChange={handlePageChange}/>
          </ALFlexBox>
        </div>
      </div>

      {/*显示设计师*/}
      <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
        <h2 style={isMobile ? {marginLeft:  "20px"} : {}}>设计师/开发者推荐</h2>
        <ShowDesigner/>
      </div>
    </div>
  );
}
