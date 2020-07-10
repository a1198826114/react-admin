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
