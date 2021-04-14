import React, {useEffect, useState} from "react";
import {HttpRequest} from "../../../../util/network/request";
import {Avatar, Carousel, message} from "antd";
import {ApiConst} from "../../../../util/network/config/ApiConst";
import {ALImage} from "../../../../components/al-component";
import {RouterConst} from "../../../../util/router/config/RouterConst";
import {connect} from "react-redux";

function ShowCarousel(props) {

  const {history, isMobile} = props;
  const [carouselList, setCarouselList] = useState([]);
  useEffect(() => {
    getCarouselList();
  }, []);

  const getCarouselList = () => {
    HttpRequest.get({
      url: ApiConst.carousel.get.GET_CAROUSEL_ALL,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        setCarouselList(res.data.data);
      } else {
        message.warning("获取carousel失败");
      }
    })
  }

  const createUrl = ({type, link}) => {
    if (type === 'ui') {
      return RouterConst.work.ui.DETAIL_PAGE + link;
    }
  }


  return (
    <Carousel autoplay>
      {
        carouselList.map((item, index) => {
            return (
              <div key={index}>
                <a onClick={() => {
                  if (item.link) {
                    history.push(createUrl({type: item.type, link: item.link}))
                  }
                }}>
                  <ALImage src={item.imgUrl} height={isMobile ? 160 : 350}  fit={""}/>
                </a>
              </div>
            );
          })
      }
    </Carousel>
  );
}

const mapStateToProps = state => {
  return {
    isMobile: state.isMobile,
  }
}

export default connect(mapStateToProps)(ShowCarousel);
