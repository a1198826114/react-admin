import {
  reqGetSubjectList,
  reqSecGetSubjectList,
  reqUpdateSubject,
} from "@api/edu/subject.js";

import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  UPDATE_SUBJECT,
} from "./constants";
/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    console.log(112);
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
    });
  };
};
const getSecSubjectListSync = (list) => ({
  type: GET_SECSUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqSecGetSubjectList(parentId).then((response) => {
      console.log(response);
      dispatch(getSecSubjectListSync(response));
    });
  };
};

export const getUpdateSubjectList = (id, title) => {
  return (dispatch) => {
    return reqUpdateSubject(id, title).then(() => {
      dispatch(getUpdateSubjectListSync({ id, title }));
    });
  };
};

const getUpdateSubjectListSync = ({ id, title }) => ({
  type: UPDATE_SUBJECT,
  data: { title, id },
});
