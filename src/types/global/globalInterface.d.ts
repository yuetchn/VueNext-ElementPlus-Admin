/*
 * @ModuleName: 全局属性注解
 * @Author: 乐涛
 * @LastEditTime: 2022-01-13 16:17:21
 */
import { message } from "ant-design-vue";
import axios from "@/utils/request";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    /** Axios */
    $http: typeof axios;
    // Ant Message
    $message: typeof message;
  }
}
