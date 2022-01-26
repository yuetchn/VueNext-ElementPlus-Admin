/*
 * @ModuleName: 全局属性注解
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 10:20:51
 */
import { message } from "ant-design-vue";
import { Store } from "vuex";
import axios from "@/utils/request";
import { AllStates } from "@/types/store/storeInterface";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    /** Axios */
    $http: typeof axios;
    // Ant Message
    $message: typeof message;
    // store
    $store: Store<AllStates>;
  }
}
