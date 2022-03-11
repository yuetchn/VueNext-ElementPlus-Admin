/*
 * @ModuleName: App Module
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-11 10:29:25
 */
import { Module } from "vuex";
import RootStates from "@/types/store/storeInterface";

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
    nowRoutePath: sessionStorage.getItem("nowRoutePath") || "/",
    isShrink: sessionStorage.getItem("isShrink") === "1" ? true : false || false,
    nowRouteSpread: sessionStorage.getItem("nowRouteSpread") || "",
    clientWidth: 0,
    locale: localStorage.getItem("locale") || "zh-CN",
    size: (localStorage.getItem("size") as any) || "default",
  },
  mutations: {
    SET_LOADING_SHADE(state, loadingShade: boolean) {
      state.loadingShade = loadingShade;
    },
    SET_SHRINK(state, isShrink: boolean) {
      state.isShrink = isShrink;
      sessionStorage.setItem("isShrink", isShrink ? "1" : "0");
    },
    SET_NOW_ROUTE_PATH(state, nowRoutePath: string) {
      state.nowRoutePath = nowRoutePath;
      sessionStorage.setItem("nowRoutePath", nowRoutePath);
    },
    SET_NOW_ROUTE_SPREAD(state, nowRouteSpread: string) {
      state.nowRouteSpread = nowRouteSpread;
      sessionStorage.setItem("nowRouteSpread", nowRouteSpread);
    },
    RESET_ROUTE_STATE(state) {
      state.nowRoutePath = "/";
      state.nowRouteSpread = "";
      sessionStorage.removeItem("nowRoutePath");
      sessionStorage.removeItem("nowRouteSpread");
    },
    SET_CLIENT_WIDTH(state, clientWidth: number) {
      state.clientWidth = clientWidth;
    },
    SET_LOCALE(state, locale: string) {
      state.locale = locale;
      localStorage.setItem("locale", locale);
    },
    SET_SIZE(state, size: string) {
      state.size = size;
      localStorage.setItem("size", size);
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
