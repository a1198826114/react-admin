import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";

export function reqGetCourseList({ page, limit, courseId }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    params: { courseId },
    method: "GET",
  });
}
