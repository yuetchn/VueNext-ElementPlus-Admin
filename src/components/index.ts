/*
 * @ModuleName: Global components
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 10:45:01
 */
import { App } from "vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon/SvgIcon";
import Page from "./Page/Page.vue";
import Editor from "./Editor/Editor.vue";
import ChartLine from "./Charts/ChartLine.vue";

export default (app: App) => {
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
  app.component("g-page", Page);
  app.component("g-editor", Editor);
  app.component("g-chart-line", ChartLine);
};
