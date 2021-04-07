import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { ImageUtils } from 'braft-finder'
import {Button, message, Upload} from 'antd'
import Icon from "antd/es/icon";
import './style.scss';

export default class ALRichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null)
    }
    if (props.clearContent) {
      props.clearContent(this);
    }
  }



  handleChange = (editorState) => {
    this.setState({ editorState });
    // this.props.onChange(editorState);
    console.log(editorState);
    console.log(editorState.toHTML());
    this.props.onChange(editorState.toHTML());
  }

  clearContent = () => {
    this.setState({
      editorState: BraftEditor.createEditorState(null)
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  uploadHandler = (info) => {

    console.warn(info);

    if (!info.file) {
      return false
    }

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          editorState: ContentUtils.insertMedias(this.state.editorState, [{
            type: 'IMAGE',
            // url: URL.createObjectURL
            url: imageUrl
          }])
        })
      );
    }



  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG/GIF 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  render () {

    // const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            action="http://localhost:9000/upload/return-url"
            onChange={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <Button type="link" className="control-item button upload-button">
              插入图片 <Icon type="picture" theme="filled" />
            </Button>
          </Upload>
        )
      }
    ]

    const excludeControls = [
      'media', 'superscript', 'subscript'
    ]

    return (
      <div className="editor-wrapper" style={this.props.style}>
        <BraftEditor
          excludeControls={excludeControls}
          value={this.state.editorState}
          onChange={this.handleChange}
          placeholder={"请输入内容..."}
          extendControls={extendControls}
        />
      </div>
    )

  }

}
