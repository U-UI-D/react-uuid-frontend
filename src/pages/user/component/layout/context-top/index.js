import React from "react";
import './style.scss';
import UserInfoBox from "../../user-info-box";
import StatisticsBox from "../../statistics-box";
import {ALFlexBox} from "../../../../../components/al-component";

export default function ContentTop(props) {
  return (
    <ALFlexBox centerV className='content-top-wrapper content-width'>
      <UserInfoBox />
      <StatisticsBox />
    </ALFlexBox>
  )
}
