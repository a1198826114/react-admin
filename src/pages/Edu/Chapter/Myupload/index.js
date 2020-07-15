import React, { Component } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import { getToken } from "@api/edu/lesson";
import * as qiniu from "qiniu-js";
import { nanoid } from "nanoid";
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;
export default class Myupload extends Component {
  constructor() {
    super();
    const str = JSON.parse(localStorage.getItem("uploadToken"));
    if (str) {
      this.state = { ...str };
    } else {
      this.state = {
        uploadToken: "",
        expires: 0,
      };
    }
  }
  //   state = {
  //     uploadToken: "",
  //     expires: 0,
  //   };
  handleBeforeUpload = async (file, fileList) => {
    // console.log(file.size, MAX_VIDEO_SIZE);
    if (file.size > MAX_VIDEO_SIZE) {
      message.error("你上传的视频太大了");
      return Promise.reject();
    } else {
      if (Date.now() > this.state.expires) {
        const res = await getToken();
        const { uploadToken, expires } = res;
        this.saveToken(uploadToken, expires);
      }
      return Promise.resolve(file);
    }
  };
  //覆盖默认的上传行为
  handleCustormRequest = (value) => {
    const file = value.file;
    const key = nanoid(10) + "张彧豪";
    const token = this.state.uploadToken;
    const putExtra = {
      mimeType: "video/*",
    };
    const config = {
      region: qiniu.region.s3,
    };
    const observable = qiniu.upload(file, key, token, putExtra, config);

    const observer = {
      next(res) {
        value.onProgress(res.total);
      },
      error(err) {
        value.onError(err);
      },
      complete: (res) => {
        value.onSuccess(res);
        // this.props.onChange("http://qqcdb1qpp.bkt.clouddn.com/" + res.key);
        this.props.onChange("http://qdgiunu8g.bkt.clouddn.com/" + res.key);
      },
    };
    this.subscription = observable.subscribe(observer); // 上传开始
  };
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe(); // 上传取消
  }
  saveToken = (uploadToken, expires) => {
    expires = Date.now() + expires * 1000;
    localStorage.setItem(
      "uploadToken",
      JSON.stringify({ uploadToken, expires })
    );
    this.setState({ uploadToken, expires });
  };
  render() {
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustormRequest}
          accept="video/*"
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </Upload>
      </div>
    );
  }
}
