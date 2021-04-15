import {ALImage} from "../../../../components/al-component";
import {Carousel} from "antd";
import React from "react";

export default function (props) {
  const {carouselList, history, createUrl, isMobile} = props;
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
