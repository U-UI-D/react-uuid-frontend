import React from "react";
import {Avatar} from "antd";
import {ALFlexBox} from "../../../../../components/al-component";

function PosterBox(props) {

  const posterData = [
    {
      id: 1,
      title: "city",
      poster: "https://images.unsplash.com/photo-1594058573823-d8edf1ad3380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=698&q=80",
      link: ""
    },
    {
      id: 2,
      title: "city",
      poster: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      link: ""
    },
    {
      id: 3,
      title: "city",
      poster: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      link: ""
    },
    {
      id: 4,
      title: "city",
      poster: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=636&q=80",
      link: ""
    },
  ]

  return (
      <div>
        <ALFlexBox between >
          {
            posterData.map((item, index) => {
              return <div key={index} className="al-hover-shadow-black-20 primary-border-radius al-cursor-pointer">
                <Avatar src={item.poster}
                        shape="square"
                        style={{
                          width: 287.5+'px',
                          height: 600+'px',
                          borderRadius: 10+'px'
                        }} />
              </div>
            })
          }
        </ALFlexBox>
      </div>
  );
}

export default PosterBox;
