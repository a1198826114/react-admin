import React from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";
// 下面两个都是设置中文的
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
function App() {
  return (
    //设置中文的
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Layout />
      </Router>
    </ConfigProvider>
  );
}

export default App;
