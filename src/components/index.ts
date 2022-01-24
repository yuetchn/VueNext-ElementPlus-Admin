/*
 * @ModuleName: Global components
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 13:40:20
 */
import { App } from "vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon/SvgIcon";
import Page from "./Page/Page.vue"
import Editor from "./Editor/Editor.vue"

export default (app: App) => {
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
  app.component("g-page", Page)
  app.component("g-editor", Editor)
};