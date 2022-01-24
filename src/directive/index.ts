/*
 * @ModuleName: 全局指令注册
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 17:52:50
 */
import { App, Directive } from "vue";
import clipboard from "./clipboard"

/**
 * 按钮权限[v-per]
 */
const Per: Directive = {
  mounted(el, { value }) {
    console.log(el, value);
  },
};

export default (app: App) => {
  app.directive("per", Per);
  app.directive("copy", clipboard)
};
