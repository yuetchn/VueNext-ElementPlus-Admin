/*
 * @ModuleName: Global components
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 13:15:03
 */
import { App } from "vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon/SvgIcon";
import Page from "./Page/Page.vue"

export default (app: App) => {
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
  app.component("g-page", Page)
};