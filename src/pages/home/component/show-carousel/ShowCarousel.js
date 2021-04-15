import React, {useEffect, useState} from "react";
import {message} from "antd";
import {RouterConst} from "../../../../util/router/config/RouterConst";
import {connect} from "react-redux";
import ShowCarouselView from "./ShowCarouselView";
import {CarouselService} from "../../../../service/carousel/CarouselService";

function ShowCarousel(props) {

  const {history, isMobile} = props;
  const [carouselList, setCarouselList] = useState([]);
  useEffect(() => {
    getCarouselList();
  }, []);

  // 获取轮播图列表
  const getCarouselList = () => {
    CarouselService.getCarouselList().then(res => {
      setCarouselList(res);
    }).catch(err => {
      message.warning("获取carousel失败");
    });
  }

  // 构建路径
  const createUrl = ({type, link}) => {
    if (type === 'ui') {
      return RouterConst.work.ui.DETAIL_PAGE + link;
    }
  }

  return (
   <ShowCarouselView carouselList={carouselList} history={history} isMobile={isMobile} createUrl={createUrl} />
  );
}

const mapStateToProps = state => {
  return {
    isMobile: state.isMobile,
  }
}

export default connect(mapStateToProps)(ShowCarousel);
