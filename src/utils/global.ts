/*
 * @ModuleName: 全局属性挂载
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:27:29
 */
import { App } from "vue";
import { useRequest } from "@/hooks";
import * as func from "@/utils/func";

// 挂载后需要挂载声明
// src > types > global > globalInterface.d.ts 路径
export default (app: App) => {
  app.config.globalProperties.$http = useRequest();
  app.config.globalProperties.$func = func;
};
