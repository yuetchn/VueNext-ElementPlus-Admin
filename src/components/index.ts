/*
 * @ModuleName: Global components
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-08 10:39:48
 */
import { App } from "vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon/SvgIcon";
import Page from "./Page/Page.vue";
import Editor from "./Editor/Editor.vue";
import Chart from "./Charts/Chart";
import Table from "./Table/Table";
import MarkDown from "./MarkDown/MarkDown"

// 注册组件后注册组件Props声明
// src > types > components > components.d.ts
export default (app: App) => {
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
  app.component("g-page", Page);
  app.component("g-editor", Editor);
  app.component("g-chart", Chart);
  app.component("g-table", Table);
  app.component("g-mark-down", MarkDown)
};
