/*
 * @ModuleName: 全局组件注册
 * @Author: 乐涛
 * @LastEditTime: 2022-01-19 17:46:03
 */
import { App } from "vue";
import LoadingShade from "./LoadingShade/LoadingShade.vue";
import Dialog from "./Dialog/Dialog.vue";
import SvgIcon from "./SvgIcon/index";

export default (app: App) => {
  app.component("g-loading-shade", LoadingShade);
  app.component("g-dialog", Dialog);
  app.component("g-svg-icon", SvgIcon);
};
