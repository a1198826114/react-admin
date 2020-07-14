import { GET_CHAPTERLIST, GET_SECCHAPTER } from "./constant";
const initChapterLst = {
  total: 0,
  items: [],
};
export default function chapterList(prevState = initChapterLst, action) {
  switch (action.type) {
    case GET_CHAPTERLIST:
      if (action.data.items.length > 0) {
        action.data.items.forEach((item) => {
          item.children = [];
        });
      }
      return action.data;
    case GET_SECCHAPTER:
      // console.log(prevState);
      // console.log(action.data);
      if (action.data.length > 0) {
        prevState.items.forEach((item) => {
          if (item._id === action.data[0].chapterId) {
            item.children = action.data;
          }
        });
      }
      return { ...prevState };
    default:
      return { ...prevState };
  }
}
