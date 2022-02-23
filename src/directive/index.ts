/*
 * @ModuleName: 全局指令注册
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-25 11:08:41
 */
import { App } from "vue";
import clipboard from "./clipboard";

export default (app: App) => {
  // app.directive("per", Per);

  /** 写入剪切板 */
  app.directive("copy", clipboard);
};
