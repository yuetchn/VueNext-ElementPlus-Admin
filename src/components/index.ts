/*
 * @ModuleName: Global components
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-10 16:25:18
 */
import { App } from "vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon";
import Page from "./Page/Page.vue";
import Editor from "./Editor/Editor.vue";
import Chart from "./Charts";
import Table from "./Table";
import MarkDown from "./MarkDown"
import QrCode from "./QrCode"
import Link from "./Link"
import IconSelect from "./IconSelect"

// 注册组件后注册组件Props声明
// src > types > components > components.d.ts
export default (app: App) => {
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
  app.component("g-page", Page);
  app.component("g-editor", Editor);
  app.component("g-chart", Chart);
  app.component("g-table", Table);
  app.component("g-mark-down", MarkDown);
  app.component("g-qr-code", QrCode);
  app.component("g-link", Link);
  app.component("g-icon-select", IconSelect);
};

export const GTable = Table
export const GEditor = Editor
export const GDialog = Dialog
export const GSvgIcon = SvgIcon
export const GPage = Page
export const GChart = Chart
export const GMarkDown = MarkDown
export const GQrCode = QrCode
export const GLink = Link
export const GIconSelect = IconSelect