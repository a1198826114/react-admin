import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";
//测试所用代码
// const MOCK_URL = `http://localhost:8888${BASE_URL}`;
// 获取subject列表
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
export function reqSecGetSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}
//添加分类信息
export function reqAddSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    data: { title, parentId },
    method: "POST",
  });
}

//更新分类信息
export function reqUpdateSubject(id, title) {
  return request({
    url: `${BASE_URL}/update`,
    data: { title, id },
    method: "PUT",
  });
}

//删除分类信息
export function delSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}
