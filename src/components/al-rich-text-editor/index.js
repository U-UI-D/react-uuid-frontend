import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { ImageUtils } from 'braft-finder'
import {Button, Upload} from 'antd'
import Icon from "antd/es/icon";
import './style.scss';

export default class ALRichTextEditor extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(null)
  }

  handleChange = (editorState) => {
    this.setState({ editorState });
    // this.props.onChange(editorState);
  }

  uploadHandler = (param) => {

    if (!param.file) {
      return false
    }

    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [{
        type: 'IMAGE',
        url: URL.createObjectURL
      }])
    })

  }

  render () {

    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <Button type="link" className="control-item button upload-button">
              插入图片 <Icon type="picture" theme="filled" />
            </Button>
          </Upload>
        )
      }
    ]

    return (
      <div className="editor-wrapper" style={this.props.style}>
        <BraftEditor
          value={this.state.editorState}
          onChange={this.handleChange}
          controls={controls}
          placeholder={"请输入内容..."}
          extendControls={extendControls} style={{height: "300px"}}
        />
      </div>
    )

  }

}
