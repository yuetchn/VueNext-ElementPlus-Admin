/*
 * @ModuleName: 全局指令注册
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 11:08:41
 */
import { App } from "vue";
import clipboard from "./clipboard";

export default (app: App) => {
  // app.directive("per", Per);

  /** 写入剪切板 */
  app.directive("copy", clipboard);
};
