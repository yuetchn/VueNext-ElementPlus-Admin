/*
 * @ModuleName: 全局属性挂载
 * @Author: 乐涛
 * @LastEditTime: 2022-01-12 11:21:07
 */
import { App } from "vue";
import axios from "@/utils/request";

export default (app: App) => {
  app.config.globalProperties.$http = axios;
};
