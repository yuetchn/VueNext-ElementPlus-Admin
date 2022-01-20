/*
 * @ModuleName: 全局指令注册
 * @Author: 乐涛
 * @LastEditTime: 2022-01-12 11:13:57
 */
import { App, Directive } from "vue";

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
};
