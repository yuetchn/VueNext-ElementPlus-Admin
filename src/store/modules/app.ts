/*
 * @ModuleName: App Module
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 09:26:43
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
}
const UserModule: Module<AppStates, RootStates> = {
  namespaced: true,
  state: {
    loadingShade: false,
    nowRoutePath: sessionStorage.getItem("nowRoutePath") || "/",
    isShrink: sessionStorage.getItem("isShrink") === "1" ? true : false || false,
    nowRouteSpread: sessionStorage.getItem("nowRouteSpread") || "",
    clientWidth: 0,
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
    setClientWidth({ commit }, clientWidth) {
      commit("SET_CLIENT_WIDTH", clientWidth)
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
