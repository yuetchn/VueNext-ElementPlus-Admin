/*
 * @ModuleName: Element Use
 * @Author: 乐涛
 * @LastEditTime: 2022-01-18 17:13:13
 */
import { App } from "vue";
import ElementPlus from "element-plus";

export default (app: App) => {
  app.use(ElementPlus, { size: "mini" });
};
