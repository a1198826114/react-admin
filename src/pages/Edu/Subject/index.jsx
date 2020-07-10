import React, { Component } from "react";
import { Button, Table, Pagination } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
// import { reqGetSubjectList } from "@api/edu/subject.js";
import "./index.less";

import { getSubjectList } from "./redux/index";
import { connect } from "react-redux";

const columns = [
  { title: "分类名称", dataIndex: "title", key: "title" },
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    width: 200,
    render: () => (
      <>
        <Button type="primary" style={{ marginRight: "20px" }}>
          <FormOutlined />
        </Button>
        <Button type="danger">
          <DeleteOutlined />
        </Button>
      </>
    ),
  },
];
//🐍皮语法,这里的state是总的state
@connect((state) => ({ state: state.subjectList }), { getSubjectList })
class Subject extends Component {
  currentPage = 1;
  // state = {
  //   subject: { total: 0, items: [] },
  // };
  componentDidMount() {
    this.props.getSubjectList(1, 6);
  }
  // getSubjectList = async (page, limit) => {
  //   const res = await getSubjectList(page, limit);
  //   this.setState({
  //     subject: res,
  //   });
  // };
  handelChange = (page, size) => {
    this.props.getSubjectList(page, size);
    this.currentPage = page;
  };
  showSizeChange = (current, size) => {
    this.props.getSubjectList(current, size);
    this.currentPage = current;
  };
  render() {
    return (
      <>
        <div className="createNewButton">
          <Button type="primary">
            <PlusOutlined />
            新建
          </Button>
          <Table
            //这个rowkey表示'_id'代替默认的‘key’属性
            rowKey="_id"
            columns={columns}
            style={{ marginTop: "10px" }}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            // dataSource={this.state.subject.items}
            dataSource={this.props.state.items}
            pagination={{
              total: this.props.state.total, //total表示数据总数
              showQuickJumper: true, //是否显示快速跳转
              showSizeChanger: true, // 是否显示修改每页显示数据数量
              pageSizeOptions: ["3", "6", "9"], //设置每天显示数据数量的配置项
              defaultPageSize: 4, //每页默认显示数据条数 默认是10,
              onChange: this.handelChange, //页码改变的时候触发,
              onShowSizeChange: this.showSizeChange, //一页展示几条数据变化时触发 current 当前页码, size 一页几条
              current: this.currentPage,
            }}
          />
        </div>
      </>
    );
  }
}
export default Subject;
