import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

export function reqLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}

//新增课时
export function addLessonList({ chapterId, title, free, video }) {
  return request({
    url: `${BASE_URL}/save`,
    method: "GET",
    params: { chapterId, title, free, video },
  });
}

//删除单个课时
export function delLessonList(lessonId) {
  return request({
    url: `${BASE_URL}/remove/${lessonId}`,
    method: "DELETE",
  });
}
