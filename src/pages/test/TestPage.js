import React from "react";
import {Avatar, Button} from 'antd';
import ALImage from "../../components/al-image/ALImage";

class TestPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }
  }


  render() {
    let url = "https://ali.image.hellorf.com/images/682ccd2b82519cde5d416c7c932b1788.jpeg?x-oss-process=image/resize,h_528";

    return (
        <>
          <div>
            <Button onClick={() => this.props.history.push('/demo')}>demo页面</Button>
          </div>

          <ALImage src={url} circle/>
          <ALImage src={url} width={200} height={200} />

          <div className="al-box-size-200px al-bg-color-yellow al-overflow-hide al-flex-container-center-vh"
               style={{
                 borderRadius: 50 + '%',
               }}>
            <img src={url} style={{
              width: 100 + '%',
              height: 100 + '%',
              objectFit: "cover"
            }} />
          </div>

        </>
    );
  }
}

export default TestPage;
