/*
 * @ModuleName: 全局属性挂载
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-25 10:18:51
 */
import { App } from "vue";
import axios from "@/utils/request";

export default (app: App) => {
  app.config.globalProperties.$http = axios;
};
