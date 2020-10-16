import React from "react";
import {Pagination, Button, Upload, Menu} from 'antd';
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ALHeader from "../../components/al-header/ALHeader";
import MenuItem from "antd/es/menu/MenuItem";


class TestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      current: ["item1"],
    }
  }


  render() {
    let url = "https://ali.image.hellorf.com/images/682ccd2b82519cde5d416c7c932b1788.jpeg?x-oss-process=image/resize,h_528";

    return (
      <div className="">
        <div className="content-width al-p-tb-20px">

          <div>
            <Button onClick={() => this.props.history.push('/demo')}>demo页面</Button>
          </div>

          <div>
            <Menu mode="horizontal"
                  defaultSelectedKeys={this.state.current}
                  onSelect={({item, key}) => {
                    console.log("item", item);
                    console.log("key", key);
                    let arr = [];
                    arr.push(key);
                    this.setState({
                      current: arr
                    })
                  }}
            >
              <MenuItem key={"item1"}>
                item1
              </MenuItem>
              <MenuItem key={"item2"}>
                item2
              </MenuItem>
              <MenuItem key={"item3"}>
                item3
              </MenuItem>
            </Menu>
          </div>
        </div>


      </div>
    );
  }
}

export default TestPage;
