import React, { Component } from "react";

import { Card, Col, Form, Input, Select, Button, message } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
// import { getSubjectList, subjectList } from "../../redux/index";
import { reqGetSubjectList, reqAddSubject } from "@api/edu/subject";
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

const Option = Select.Option;
// @connect(subjectList, { getSubjectList })
class AddSubject extends Component {
  //   async componentDidMount() {
  //     await reqAddSubject();
  //   }
  state = {
    total: 0,
    items: [],
  };
  async componentDidMount() {
    // this.props.getSubjectList(1, 10);
    const res = await reqGetSubjectList(this.page++, 10);
    console.log(res);
    this.setState({
      total: res.total,
      items: res.items,
    });
  }
  //加载更多数据
  handleLoad = async () => {
    const res = await reqGetSubjectList(this.page++, 10);
    const newItems = [...this.state.items, ...res.items];
    this.setState({
      total: res.total,
      items: newItems,
    });
  };

  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      await reqAddSubject(values.subjectname, values.parentid);
      message.success("添加分类信息成功");
      this.props.history.push("/edu/subject/list");
    } catch (e) {
      message.error("添加分类信息失败");
    }
  };
  page = 1;
  render() {
    return (
      <Card
        title={
          <>
            <Col span={3}>
              <Link to="/edu/subject/list">
                <ArrowLeftOutlined />
              </Link>
            </Col>

            <Col span={6}>
              <span style={{ marginLeft: "20px" }}>新增课程</span>
            </Col>
          </>
        }
      >
        <Form {...layout} name="subject" onFinish={this.onFinish}>
          <Form.Item
            label="课程分类名称"
            name="subjectname"
            rules={[
              {
                required: true,
                message: "请输入课程分类!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="父级分类id"
            name="parentid"
            rules={[
              {
                required: true,
                message: "请选择分类id",
              },
            ]}
          >
            <Select
              dropdownRender={(menu) => {
                return (
                  <>
                    {menu}
                    {this.state.total > this.state.items.length && (
                      <Button type="link" onClick={this.handleLoad}>
                        加载更多数据
                      </Button>
                    )}
                  </>
                );
              }}
            >
              <Option value={0}>{"一级课程分类信息"}</Option>
              {this.state.items.map((subject) => {
                return (
                  <Option value={subject._id} key={subject._id}>
                    {subject.title}
                  </Option>
                );
              })}
            </Select>
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
export default AddSubject;
