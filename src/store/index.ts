/*
 * @ModuleName: Vuex
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:21:52
 */
import { createStore, Store, useStore as _useStore } from "vuex";
import { InjectionKey } from "vue";
import RootStates, { AllStates } from "@/types/src/store/storeInterface";
import UserModule from "./modules/user";
import AppModule from "./modules/app";
import ViewTagModule from "./modules/viewTag";

export const key: InjectionKey<Store<RootStates>> = Symbol("store_key");
const store = createStore<RootStates>({
  state: {
    app: "1.0",
  },
  modules: {
    UserModule,
    AppModule,
    ViewTagModule,
  },
  devtools: import.meta.env.MODE === "development",
});
export default store;
export const useStore = <T = AllStates>() => _useStore<T>(key);
