import React, { Component, useEffect, useState } from "react";
import { Form, Select, Button, message } from "antd";
import { reqGetCourseList } from "@api/edu/course.js";
import { connect } from "react-redux";
import "./index.less";
import { getChapterList } from "../redux/actions";

const { Option } = Select;

function SearchForm(props) {
  const [courseList, setCourseList] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    (async function () {
      const res = await reqGetCourseList();
      setCourseList(res);
    })();
  }, []);
  const resetForm = () => {
    form.resetFields();
  };

  async function handleFinsh(value) {
    const page = 1;
    const limit = 10;
    const courseId = value.teacherId;
    await props.getChapterList({ page, limit, courseId });
    message.success("查询章节成功");
    // console.log(value);
  }
  return (
    <Form layout="inline" form={form} onFinish={handleFinsh}>
      <Form.Item name="teacherId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map((value) => (
            <Option value={value._id} key={value._id}>
              {value.title}
            </Option>
          ))}
          {/* <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getChapterList })(SearchForm);
