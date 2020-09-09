import React from "react";
import {Avatar} from "antd";
import ALFlexBox from "../../../../../components/al-flex-box/ALFlexBox";

function IllustrationBox(props) {
  const illustrationData = [
    {
      id: 1,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236417619.jpg",
      link: ""
    },
    {
      id: 2,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236417614.jpg",
      link: ""
    },
    {
      id: 3,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236421024.jpg",
      link: ""
    },
    {
      id: 4,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236430591.jpg",
      link: ""
    },
    {
      id: 5,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236430594.jpg",
      link: ""
    },
    {
      id: 6,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236417614.jpg",
      link: ""
    },
    {
      id: 7,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236430593.jpg",
      link: ""
    },
    {
      id: 8,
      title: "city",
      url: "https://hellorfimg.zcool.cn/provider_image/preview260/2236430596.jpg",
      link: ""
    },
  ];

  return (
      <div>
        <ALFlexBox centerV between wrap>
          {
            illustrationData.map((item, index) => {
              return (
                  <div className="al-m-bottom-10px primary-border-radius al-hover-shadow-black-20 al-cursor-pointer">
                    <Avatar key={index}
                            src={item.url}
                            shape="square"
                            style={{
                              width: 287.5 + 'px',
                              height: 220 + 'px',
                              borderRadius: 10 + "px"
                            }}/>
                  </div>
              )
            })
          }
        </ALFlexBox>
      </div>
  );
}

export default IllustrationBox;
