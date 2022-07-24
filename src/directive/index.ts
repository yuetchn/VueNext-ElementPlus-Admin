/*
 * @ModuleName: 全局指令注册
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-22 15:23:06
 */
import { App } from "vue";
import clipboard from "./src/clipboard";
import per from "./src/permission"

export default (app: App) => {
  /** 按钮权限 */
  app.directive("per", per);

  /** 写入剪切板 */
  app.directive("copy", clipboard);
};
