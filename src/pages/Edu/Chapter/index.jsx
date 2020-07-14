import React, { Component } from "react";
import {
  Button,
  message,
  Tooltip,
  Alert,
  Table,
  Input,
  Switch,
  Modal,
} from "antd";

import { getSecChapterList } from "../Chapter/redux";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import { delLessonList } from "@api/edu/lesson";
import "./index.less";

import { chapterList } from "./redux";

dayjs.extend(relativeTime);
const { confirm } = Modal;
@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList,
  }),
  // { getcourseList }
  { getSecChapterList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    lessonId: "",
    lessonTitle: "",
    lessonFree: "",
  };

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  //点击加号进行展开
  handelClickExpand = (expanded, record) => {
    console.log(record);
    if (expanded) {
      this.props.getSecChapterList(record._id);
    }
  };
  //点击更新数据
  handleUpdate = (value) => () => {
    // console.log(value);
    this.setState({
      lessonId: value._id,
      lessonTitle: value.title,
      lessonFree: value.free,
    });
  };

  handelChangeValue = (e) => {
    this.setState({
      lessonTitle: e.target.value,
    });
  };

  handelChangeFree = (checked) => {
    this.setState({
      lessonFree: checked,
    });
  };
  handelCancel = () => {
    this.setState({
      lessonId: "",
      lessonTitle: "",
    });
  };

  //点击进行单个删除
  handelDel = (data) => () => {
    confirm({
      title: "你确定要删除嘛?",
      icon: <ExclamationCircleOutlined />,
      okText: "是的",
      okType: "danger",
      cancelText: "不是",
      onOk: () => {
        delLessonList(data._id);
        // console.log(data);
        this.props.getSecChapterList(data.chapterId);
      },
    });
  };
  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state;

    const columns = [
      {
        title: "章节名称",
        // dataIndex: "",
        render: (value) => {
          if (value._id === this.state.lessonId) {
            return (
              <Input
                style={{ width: "300px" }}
                value={this.state.lessonTitle}
                onChange={this.handelChangeValue}
              ></Input>
            );
          } else {
            return <span>{value.title}</span>;
          }
        },
      },
      {
        title: "是否免费",
        // dataIndex: "free",
        render: (value) => {
          if (value._id === this.state.lessonId) {
            return (
              <Switch
                checkedChildren="是"
                unCheckedChildren="否"
                checked={this.state.lessonFree}
                onChange={this.handelChangeFree}
              ></Switch>
            );
          }
          return value.free === true ? "是" : value.free === false ? "否" : "";
          // return <Input></Input>;
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          // console.log(data);
          if ("free" in data) {
            if (data._id === this.state.lessonId) {
              return (
                <>
                  <Button type="primary" style={{ margin: "0 10px" }}>
                    确认
                  </Button>
                  <Button type="danger" onClick={this.handelCancel}>
                    取消
                  </Button>
                </>
              );
            }
            return (
              <div>
                <Tooltip title="查看详情">
                  <Button>
                    <SettingOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="更新章节">
                  <Button
                    type="primary"
                    style={{ margin: "0 10px" }}
                    onClick={this.handleUpdate(data)}
                  >
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="删除章节">
                  <Button type="danger" onClick={this.handelDel(data)}>
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </div>
            );
          }
        },
      },
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            expandable={{ onExpand: this.handelClickExpand }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Chapter;
