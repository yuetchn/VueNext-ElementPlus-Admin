/*
 * @ModuleName: Global components
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 11:48:44
 */
import { App } from "vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon/index";

export default (app: App) => {
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
};
