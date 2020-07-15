import React, { Component } from "react";

import { Card, Col, Form, Input, Select, Button, message, Switch } from "antd";
import Myupload from "../Myupload";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addLesson } from "@api/edu/lesson";
//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3,
  },
  // 表单项部分
  wrapperCol: {
    span: 6,
  },
};

class AddLesson extends Component {
  //   // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async (value) => {
    console.log(this.props);
    const chapterId = this.props.location.state.chapterId;
    console.log(value);
    await addLesson({ ...value, chapterId });
    message.success("添加成功");
    this.props.history.push("/edu/chapter/list");
  };

  render() {
    return (
      <Card
        title={
          <>
            <Col span={6}>
              <Link to="/edu/chapter/list">
                <ArrowLeftOutlined />
              </Link>
              <span style={{ marginLeft: "20px" }}>新增课时</span>
            </Col>
          </>
        }
      >
        <Form
          {...layout}
          name="addLesson"
          onFinish={this.onFinish}
          // 这个是个具体表单项设置默认值，是个对象，键名是表单项的name属性
          initialValues={{ free: true }}
        >
          <Form.Item
            label="课时名称"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入课时名字!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="是否免费"
            name="free"
            rules={[
              {
                required: true,
                message: "请选择是否免费",
              },
            ]}
            valuePropName="checked"
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            ></Switch>
          </Form.Item>

          <Form.Item
            label="上传视频"
            name="video"
            rules={[
              {
                required: true,
                message: "上传视频",
              },
            ]}
          >
            <Myupload></Myupload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default AddLesson;
