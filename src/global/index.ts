/*
 * @ModuleName: 全局属性挂载
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-10-17 09:16:14
 */
import { App } from "vue";
import req from "@/utils/request";
import * as func from "@/utils/func";

// 挂载后需要挂载声明
// src > types > global > globalInterface.d.ts 路径
export default (app: App) => {
  app.config.globalProperties.$http = req;
  app.config.globalProperties.$func = func;
};
