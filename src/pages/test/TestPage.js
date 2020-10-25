import React from "react";
import {Button, Input} from 'antd';
import store from "../../store";
import {connect} from "react-redux";



class TestPage extends React.Component {
  constructor(props) {
    super(props);

    const {userInfo} = store.getState();
    this.state = {
      userInfo: userInfo
    };

  }

  storeChange = () => {
    this.setState({userInfo: store.getState().userInfo});
  }

  componentDidMount() {
    store.subscribe(this.storeChange);
    console.log("state", this.state);
  }

  handleChange = (e) => {
    console.log(e.target.value);
    // const {userInfo} = store.getState();
    // userInfo.nickname = e.target.value;
    // const action = {
    //   type: "changeUserInfo",
    //   value: userInfo
    // }
    //
    // store.dispatch(action);
    //
    // console.log("store", store.getState());
    this.props.updateName(e.target.value);

    console.log("name", store.getState().name);
  }


  render() {
    let url = "https://ali.image.hellorf.com/images/682ccd2b82519cde5d416c7c932b1788.jpeg?x-oss-process=image/resize,h_528";

    return (
      <div className="">
        <div className="content-width al-p-tb-20px">

          <div>
            <Button onClick={() => this.props.history.push('/demo')}>demo页面</Button>
          </div>

          <div className="al-box-size-200px al-show-border">
            {this.state.userInfo === null ? "22" : this.state.userInfo.nickname}
          </div>

          <div>{this.props.name}</div>
          <Input onChange={this.handleChange} />

        </div>




      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    name: state.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateName(data){
      let action = {
        type: "updateName",
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
