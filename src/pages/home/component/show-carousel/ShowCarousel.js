import React, {useEffect, useState} from "react";
import {HttpRequest} from "../../../../util/network/request";
import {Avatar, Carousel, message} from "antd";
import {ApiConst} from "../../../../util/network/config/ApiConst";
import {ALImage} from "../../../../components/al-component";

function ShowCarousel(props) {

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

  return (
    <Carousel autoplay>
      {
        carouselList.map((item, index) => {
            return (
              <div key={index}>
                <a href={item.url}>
                  <ALImage src={item.imgUrl} height={350} width={1180} fit={""}/>
                </a>
              </div>
            );
          })
      }
    </Carousel>
  );
}

export default ShowCarousel;
