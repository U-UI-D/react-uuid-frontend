import {WorkPageContext} from "./context/WorkPageContext";
import {Affix, Empty, Pagination} from "antd";
import TitleList from "./component/title-list/TitleList";
import {ALFlexBox, ALLoading, ALPlaceBox} from "../../components/al-component";
import {RouterConst} from "../../util/router/config/RouterConst";
import ShowWorkBox from "./component/show-work-box/ShowWorkBox";
import React from "react";

export default function (props) {
  const {isMobile, workData, workType, currentPageNum, currentPageSize, total} = props;
  const {goPage, handleTitleListChange, onShowSizeChange, handlePageChange} = props;
  console.warn("WorkPageView props", props);
  return (
    <WorkPageContext.Provider value={props}>
      <div>
        <Affix>
          <TitleList onChange={handleTitleListChange} />
        </Affix>

        {/*作品列表*/}
        <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
          <ALPlaceBox height={10}/>
          <div style={{marginLeft: isMobile ? null : "15px"}}>
            {
              workData === null ? <ALLoading show height={200}/>
                :
                (
                  workData.total === 0 ? <Empty /> :
                    <ALFlexBox centerVH={isMobile} wrap margin={isMobile ? 0 : -15}>
                      {
                        workData.list && workData.list.map((item, index) => {
                          return (
                            <div key={index} onClick={() => {
                              goPage((workType === 'UI作品' ? RouterConst.work.ui.DETAIL_PAGE : RouterConst.work.software.DETAIL_PAGE) + item.id);
                            }} className={`${isMobile ? "al-width-96" : ""}`}>
                              <ShowWorkBox workInfo={item}/>
                            </div>
                          )
                        })
                      }
                    </ALFlexBox>
                )
            }

            {/*分页*/}
            <ALFlexBox centerH className="al-m-tb-20px">
              <Pagination current={currentPageNum}
                          total={total}
                          defaultPageSize={currentPageSize}
                          pageSizeOptions={["20", "40", "60", "80", "100"]}
                          hideOnSinglePage
                          onShowSizeChange={onShowSizeChange}
                          onChange={handlePageChange}/>
            </ALFlexBox>
          </div>
        </div>
      </div>
    </WorkPageContext.Provider>
  );
}
