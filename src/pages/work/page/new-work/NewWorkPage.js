import React from "react";
import "./style.scss";
import WorkPublishLeftLayout from "./component/layout/left/WorkPublishLeftLayout";
import WorkPublishRightLayout from "./component/layout/right/WorkPublishRightLayout";
import {ALFlexBox} from "@components/al-component";
import {connect} from "react-redux";
import {ActionTypes} from "@store/action-types";

function View(props) {
  const {currentTitle, history} = props;
  const {handleChangeForTitle} = props;
  return (
    <div id="work-publish-page">
      <div className="content-width al-p-tb-20px">
        <ALFlexBox between>
          <WorkPublishLeftLayout onChange={handleChangeForTitle}/>
          <WorkPublishRightLayout title={currentTitle} history={history} />
        </ALFlexBox>
      </div>
    </div>
  );
}

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

  render() {
    return (<View {...this.state} {...this.props} handleChangeForTitle={this.handleChangeForTitle} />);
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  handleChangeForTitle = (val) => {
    this.setState({
      currentTitle: val,
    })
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
