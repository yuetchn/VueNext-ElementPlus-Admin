/*
 * @ModuleName: 全局属性注解
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:10:42
 */
import { message } from "ant-design-vue";
import { Store } from "vuex";
import axios from "@/utils/request";
import * as func from "@/utils/func";
import { AllStates } from "@/types";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    /** Request */
    $http: typeof axios;
    // Ant Message
    $message: typeof message;
    // Store
    $store: Store<AllStates>;
    // Func
    $func: typeof func;
  }
}
