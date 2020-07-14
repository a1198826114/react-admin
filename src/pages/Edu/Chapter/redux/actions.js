import { GET_CHAPTERLIST, GET_SECCHAPTER } from "./constant";
import { reqGetCourseList } from "@api/edu/chapter";
import { reqLessonList } from "@api/edu/lesson";
function getChapterListSync(data) {
  return {
    type: GET_CHAPTERLIST,
    data,
  };
}
export function getChapterList({ page, limit, courseId }) {
  return (dispatch) => {
    reqGetCourseList({ page, limit, courseId }).then((res) => {
      console.log(111);
      dispatch(getChapterListSync(res));
    });
  };
}

function getSecChapterListSync(data) {
  return {
    type: GET_SECCHAPTER,
    data,
  };
}
export function getSecChapterList(chapterId) {
  return (dispatch) => {
    reqLessonList(chapterId).then((res) => {
      dispatch(getSecChapterListSync(res));
    });
  };
}
