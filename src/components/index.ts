/*
 * @ModuleName: Global components
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-11 09:55:07
 */
import { App } from "vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon/SvgIcon";
import Page from "./Page/Page.vue";
import Editor from "./Editor/Editor.vue";
import ChartLine from "./Charts/ChartLine.vue";
import Table from "./Table/Table";

export default (app: App) => {
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
  app.component("g-page", Page);
  app.component("g-editor", Editor);
  app.component("g-chart-line", ChartLine);
  app.component("g-table", Table);
};
