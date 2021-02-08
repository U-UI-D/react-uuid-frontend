import React from "react";
import './style.css';
import UserInfoBox from "../../user-info-box";
import StatisticsBox from "../../statistics-box";
import {ALFlexBox} from "../../../../../components/al-component";

export default function ContentTop(props) {
  return (
    <div className='content-top-wrapper al-show-border'>
      <ALFlexBox between className='content-width al-show-border-green'>
        <UserInfoBox />

        <StatisticsBox />
      </ALFlexBox>
    </div>
  )
}