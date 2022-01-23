/*
 * @ModuleName: Element Use
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 13:19:11
 */
import { App } from "vue";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn"

export default (app: App) => {
  app.use(ElementPlus, { size: "mini", locale });
};