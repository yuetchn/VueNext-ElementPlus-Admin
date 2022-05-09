/*
 * @ModuleName: 全局属性挂载
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 10:43:05
 */
import { App } from "vue";
import axios from "@/utils/request";
import * as func from "@/utils/func";

// 挂载后需要挂载声明
// src > types > global > globalInterface.d.ts 路径
export default (app: App) => {
  app.config.globalProperties.$http = axios;
  app.config.globalProperties.$func = func;
};
