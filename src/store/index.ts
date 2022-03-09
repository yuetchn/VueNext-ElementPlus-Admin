/*
 * @ModuleName: Vuex
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-09 14:25:06
 */
import { createStore, Store, useStore as _useStore } from "vuex";
import { InjectionKey } from "vue";
import RootStates, { AllStates } from "@/types/store/storeInterface";
import UserModule from "./modules/user";
import AppModule from "./modules/app";
import ViewTagModule from "./modules/viewTag";

export const key: InjectionKey<Store<RootStates>> = Symbol("store");
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
