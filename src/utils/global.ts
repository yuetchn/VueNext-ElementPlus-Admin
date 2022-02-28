/*
 * @ModuleName: 全局属性挂载
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 11:15:18
 */
import { App } from "vue";
import axios from "@/utils/request";
import * as func from "@/utils/func";

export default (app: App) => {
  app.config.globalProperties.$http = axios;
  app.config.globalProperties.$func = func;
};
