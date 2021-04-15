import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ShowDesignerView from "./ShowDesignerView";
import {UserService} from "../../../../service/user/UserService";

function ShowDesigner(props) {
  const {isMobile} = props;
  const [designerData, setDesignerData] = useState(null);
  useEffect( () => {
    getDesignerList();
  }, []);

  const getDesignerList = () => {
    UserService.getDesignerList().then(res => {
      setDesignerData(res.data)
    }).catch(err => {

    });
  }

  return (
    <ShowDesignerView
      isMobile={isMobile} designerData={designerData}/>
  );
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobile
  }
}

export default connect(mapStateToProps)(ShowDesigner);
