import React from "react";
import "./style.css";
import WorkPublishLeftLayout from "./component/layout/left/WorkPublishLeftLayout";
import WorkPublishRightLayout from "./component/layout/right/WorkPublishRightLayout";
import {ALFlexBox} from "../../../../components/al-component";
import {connect} from "react-redux";
import {ActionTypes} from "../../../../store/action-types";


class NewWorkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workData: null,
      currentTitle: "上传作品",
    }
  }

  componentDidMount() {
    this.props.updateCurrentHeaderTitle('上传');
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

const mapStateToProps = (state) => {
  return {
    currentHeaderTitle: state.currentHeaderTitle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentHeaderTitle(data) {
      let action = {
        type: ActionTypes.header.UPDATE_CURRENT_HEADER_TITLE,
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkPage);
