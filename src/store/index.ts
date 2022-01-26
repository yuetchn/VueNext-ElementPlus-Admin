/*
 * @ModuleName: Vuex
 * @Author: 乐涛
 * @LastEditTime: 2022-01-26 09:58:49
 */
import { createStore, Store, useStore as _useStore } from "vuex";
import { InjectionKey } from "vue";
import RootStates, { AllStates } from "@/types/store/storeInterface";
import UserModule from "./modules/user";
import AppModule from "./modules/app";
import ViewTagModule from "./modules/viewTag";

export const key: InjectionKey<Store<RootStates>> = Symbol("store");
export const store = createStore<RootStates>({
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

export const useStore = <T = AllStates>() => _useStore<T>(key);
