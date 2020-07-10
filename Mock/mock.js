const express = require("express");
const app = express();
const Mock = require("mockjs");
var Random = Mock.Random;
Random.ctitle();
app.use((req, res, next) => {
  //设置响应头
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type,token");
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  //调用下一个中间件
  next();
});
app.get("/admin/edu/subject/:page/:limit", (req, res) => {
  const { page, limit } = req.params;
  const data = Mock.mock({
    total: Random.integer(+limit + 2, +limit * 2),
    [`items|${limit}`]: [
      {
        "_id|+1": 1,
        //设置2到5个中文
        title: "@ctitle(2,5)",
        parentId: 0,
      },
    ],
  });
  //这是node里提供的简洁方法，作用是将数据变为json字符串，并返回给浏览器，还设置了响应头的格式，代替了我下面的代码
  res.json({
    code: 20000,
    success: true,
    data,
    message: "",
  });
  //   const sd = {
  //     code: 20000,
  //     success: true,
  //     data,
  //     message: "",
  //   };
  //   const resul = JSON.stringify(sd);
  //   res.setHeader("Content-Type", "text/html; charset=utf-8");
  //   res.end(resul);
});
app.listen(8888, function (err) {
  if (err) {
    console.log("监听发生错误");
  }
  console.log("8888端口正在监听中");
});
