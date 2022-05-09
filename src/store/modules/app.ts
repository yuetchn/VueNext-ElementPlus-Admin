/*
 * @ModuleName: App Module
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 11:22:06
 */
import { Module } from "vuex";
import RootStates from "@/types/store/storeInterface";
import * as cache from "@/utils/cache"

export interface AppStates {
  /** 遮罩状态 */
  loadingShade: boolean;
  /** 侧边收缩状态 */
  isShrink: boolean;
  /** 当前路由状态 */
  nowRoutePath: string;
  /** 当前路由展开状态 */
  nowRouteSpread: string;
  /** client 宽度 */
  clientWidth: number;
  /** 国际化语言 */
  locale: string;
  /** 组件大小 "large" | "default" | "small" */
  size: string;
}
const UserModule: Module<AppStates, RootStates> = {
  namespaced: true,
  state: {
    loadingShade: false,
    nowRoutePath: cache.getSessionStorageByString("nowRoutePath") || "/",
    isShrink: cache.getSessionStorageByString("isShrink") === "1" ? true : false || false,
    nowRouteSpread: cache.getSessionStorageByString("nowRouteSpread") || "",
    clientWidth: 0,
    locale: cache.getLocalStorageByString("locale") || "zh-CN",
    size: (cache.getLocalStorageByString("size") as any) || "default",
  },
  mutations: {
    SET_LOADING_SHADE(state, loadingShade: boolean) {
      state.loadingShade = loadingShade;
    },
    SET_SHRINK(state, isShrink: boolean) {
      state.isShrink = isShrink;
      cache.setSessionStorageByString("isShrink", isShrink ? "1" : "0");
    },
    SET_NOW_ROUTE_PATH(state, nowRoutePath: string) {
      state.nowRoutePath = nowRoutePath;
      cache.setSessionStorageByString("nowRoutePath", nowRoutePath);
    },
    SET_NOW_ROUTE_SPREAD(state, nowRouteSpread: string) {
      state.nowRouteSpread = nowRouteSpread;
      cache.setSessionStorageByString("nowRouteSpread", nowRouteSpread);
    },
    RESET_ROUTE_STATE(state) {
      state.nowRoutePath = "/";
      state.nowRouteSpread = "";
      cache.removeSessionStorage("nowRoutePath");
      cache.removeSessionStorage("nowRouteSpread");
    },
    SET_CLIENT_WIDTH(state, clientWidth: number) {
      state.clientWidth = clientWidth;
    },
    SET_LOCALE(state, locale: string) {
      state.locale = locale;
      cache.setLocalStorageByString("locale", locale);
    },
    SET_SIZE(state, size: string) {
      state.size = size;
      cache.setLocalStorageByString("size", size);
    },
  },
  actions: {
    // 修改遮罩状态
    set_loadingShade({ commit }, loadingShade: boolean) {
      commit("SET_LOADING_SHADE", loadingShade);
    },
    // 侧边导航栏收缩
    set_shrink({ commit }, isShrink: boolean) {
      commit("SET_SHRINK", isShrink);
    },
    // 修改当前路由状态
    setNowRoutePath({ commit }, nowRoutePaht: string) {
      commit("SET_NOW_ROUTE_PATH", nowRoutePaht);
    },
    // 修改当前路由展开状态
    setNowRouteSpread({ commit }, nowRouteSpread: string[]) {
      commit("SET_NOW_ROUTE_SPREAD", nowRouteSpread.toString());
    },
    // 重置路由状态
    resetRouteState({ commit }) {
      commit("RESET_ROUTE_STATE");
    },
    setClientWidth({ commit }, clientWidth: any) {
      commit("SET_CLIENT_WIDTH", clientWidth);
    },
    setLocale({ commit }, locale: string) {
      commit("SET_LOCALE", locale);
    },
    setSize({ commit }, size: string) {
      commit("SET_SIZE", size);
    },
  },
  getters: {
    getNowRoutePath(state): string[] {
      return [state.nowRoutePath];
    },
    getNowRouteSpread(state): string[] {
      return state.nowRouteSpread !== "" ? state.nowRouteSpread.split(",") : [];
    },
  },
};

export default UserModule;
