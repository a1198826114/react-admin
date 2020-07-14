import React, { Component } from "react";
import { Button, Table, Input, Tooltip, message, Modal } from "antd";
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
// import { reqGetSubjectList } from "@api/edu/subject.js";
import "./index.less";

import {
  getSubjectList,
  getSecSubjectList,
  getUpdateSubjectList,
} from "./redux/index";
import { connect } from "react-redux";

import { delSubject } from "../../../api/edu/subject";
// const columns = [
//   { title: "分类名称", dataIndex: "title", key: "title" },
//   {
//     title: "操作",
//     dataIndex: "",
//     key: "x",
//     width: 200,
//     render: () => (
//       <>
//         <Button type="primary" style={{ marginRight: "20px" }}>
//           <FormOutlined />
//         </Button>
//         <Button type="danger">
//           <DeleteOutlined />
//         </Button>
//       </>
//     ),
//   },
// ];

class Subject extends Component {
  currentPage = 1;
  pageSize = 5;
  // state = {
  //   subject: { total: 0, items: [] },
  // };
  componentDidMount() {
    this.props.getSubjectList(1, 4);
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
    this.pageSize = size;
  };
  showSizeChange = (current, size) => {
    this.props.getSubjectList(current, size);
    this.currentPage = current;
  };
  //点击新增按钮进行添加
  handleClick = () => {
    this.props.history.push("/edu/subject/add");
  };

  handelClickExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id);
    }
  };
  state = {
    subjectId: "",
    subjectTitle: "",
  };
  //点击添加课程分类
  handelUpdate = (value) => () => {
    this.oldStateTitle = value.title;
    this.setState({
      subjectId: value._id,
      subjectTitle: value.title,
    });
  };
  //修改数据受控组件的回调函数
  handelChangeValue = (e) => {
    this.setState({
      subjectTitle: e.target.value.trim(),
    });
  };

  //点击取消按钮
  handleCancel = () => {
    this.setState({
      subjectId: "",
      subjectTitle: "",
    });
  };

  //点击进行更新
  handleUpdate = async () => {
    const { subjectId, subjectTitle } = this.state;

    if (subjectTitle === this.oldStateTitle) {
      return message.error("小老板不要搞事");
    } else {
      await this.props.getUpdateSubjectList(subjectId, subjectTitle);
      message.success("更新分类信息成功");
    }
    this.handleCancel();
  };

  //点击进行删除
  handleDel = (value) => () => {
    Modal.confirm({
      title: <span>你确定要删除{value.title}</span>,
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确定",
      onOk: () => {
        delSubject(value._id);
        console.log(this.props);
        if (this.currentPage !== 1 && this.props.state.items.length === 1) {
          this.props.getSubjectList(--this.currentPage, this.pageSize);
        } else {
          this.props.getSubjectList(this.currentPage, this.pageSize);
        }
      },
    });
  };
  render() {
    //columns需要拿进来原因是因为现在点击按钮要变成表单
    let columns = [
      {
        title: "分类名称",
        // dataIndex: "title",
        key: "title",
        render: (value) => {
          if (value._id === this.state.subjectId) {
            return (
              <Input
                style={{ width: "300px" }}
                value={this.state.subjectTitle}
                onChange={this.handelChangeValue}
              ></Input>
            );
          } else {
            return <span>{value.title}</span>;
          }
        },
      },
      {
        title: "操作",
        dataIndex: "",
        key: "x",
        width: 200,
        render: (value) => {
          if (value._id === this.state.subjectId) {
            return (
              <>
                <Button
                  style={{ marginRight: "20px" }}
                  type="primary"
                  onClick={this.handleUpdate}
                >
                  确认
                </Button>
                <Button type="danger" onClick={this.handleCancel}>
                  取消
                </Button>
              </>
            );
          } else {
            return (
              <>
                <Tooltip title="更新分类信息">
                  <Button
                    type="primary"
                    style={{ marginRight: "20px" }}
                    onClick={this.handelUpdate(value)}
                  >
                    <FormOutlined />
                  </Button>
                </Tooltip>

                <Button type="danger" onClick={this.handleDel(value)}>
                  <DeleteOutlined />
                </Button>
              </>
            );
          }
        },
      },
    ];
    return (
      <>
        <div className="createNewButton">
          <Button type="primary" onClick={this.handleClick}>
            <PlusOutlined />
            新建
          </Button>
          <Table
            //这个rowkey表示'_id'代替默认的‘key’属性
            rowKey="_id"
            columns={columns}
            style={{ marginTop: "10px" }}
            expandable={{ onExpand: this.handelClickExpand }}
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

//🐍皮语法,这里的state是总的state
const WithSubjet = connect((state) => ({ state: state.subjectList }), {
  getSubjectList,
  getSecSubjectList,
  getUpdateSubjectList,
})(Subject);
export default WithSubjet;
