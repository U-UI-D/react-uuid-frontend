import React from "react";
import './style.css';
import UserInfoBox from "../../user-info-box";
import StatisticsBox from "../../statistics-box";
import {ALFlexBox} from "../../../../../components/al-component";

export default function ContentTop(props) {
  return (
    <ALFlexBox centerV className='content-top-wrapper'>
      <ALFlexBox between className='content-width'>
        <UserInfoBox />
        <StatisticsBox />
      </ALFlexBox>
    </ALFlexBox>
  )
}
