import React from "react";
import "./style.css";
import WorkPublishLeftLayout from "./component/layout/left/WorkPublishLeftLayout";
import WorkPublishRightLayout from "./component/layout/right/WorkPublishRightLayout";
import {ALFlexBox} from "../../../../components/al-component";


class NewWorkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workData: null,
      currentTitle: "上传作品",
    }
  }

  componentDidMount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  handleChangeForTitle = (val) => {
    console.log("WorkPublishLeftLayout", val);
    this.setState({
      currentTitle: val,
    })
  }



  render() {

    return (
      <div id="work-publish-page">
        <div className="content-width al-p-tb-20px">
          <ALFlexBox between>
            <WorkPublishLeftLayout onChange={this.handleChangeForTitle}/>
            <WorkPublishRightLayout title={this.state.currentTitle} history={this.props.history} />
          </ALFlexBox>
        </div>
      </div>
    );
  }

}


export default NewWorkPage;
