/*
 * @ModuleName: User Module
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 11:21:26
 */
import { Module } from "vuex";
import RootStates from "@/types/store/storeInterface";
import { GetToken, SetToken, RemoveToken } from "@/utils/cookie";
import { Login } from "@/api/login";
import { GetUserInfo } from "@/api/user";
import router from "@/router";
import store from "@/store";
import * as cache from "@/utils/cache"

export interface UserStates {
  /** token */
  token: string | undefined;
  /** userName */
  userName: string;
  /** avatar */
  avatar: string;
  /** menus */
  menus: any[];
}
const UserModule: Module < UserStates, RootStates > = {
  namespaced: true,
  state: {
    token: GetToken(),
    userName: cache.getLocalStorageByString("userName") || "",
    avatar: cache.getLocalStorageByString("avatar") || "",
    menus: cache.getLocalStorageByObject<any[]>("menus") || [],
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
      SetToken(token);
    },
    REMOVE_TOKEN(state) {
      state.token = undefined;
      RemoveToken();
    },
    SET_USER_INFO(state, { userName, avatar }) {
      state.userName = userName;
      state.avatar = avatar;
      cache.setLocalStorageByString("userName", userName);
      cache.setLocalStorageByString("avatar", avatar);
    },
    REMOVE_USER_INFO(state) {
      state.userName = "";
      state.avatar = "";
      cache.removeLocalStorage("userName");
      cache.removeLocalStorage("avatar");
    },
    SET_MENUS(state, menus: any[]) {
      // 移除动态路由
      state.menus.forEach((f) => {
        if (!router.hasRoute(f.name as string)) {
          return;
        }
        router.removeRoute(f.name as string);
      });

      state.menus = menus;
      cache.setLocalStorageByObject("menus", menus);
    },
    REMOVE_MENUS(state) {
      // 移除动态路由
      state.menus.forEach((f) => {
        if (!router.hasRoute(f.name as string)) {
          return;
        }
        router.removeRoute(f.name as string);
      });

      state.menus = [];
      cache.removeLocalStorage("menus");
    },
  },
  actions: {
    // 登录
    async login({ commit }, dt: { account: string;password: string }) {
      const { data, status } = await Login(dt).catch((dt) => dt);

      if (status !== 200) {
        return Promise.reject(data);
      }
      if (data.code === 200) {
        // 此处可调用自己的方法获取用户数据，或者通过login接口直接返回数据
        const res = await GetUserInfo(data.data);
        if (res.data.code === 200) {
          commit("SET_USER_INFO", res.data.data);
          commit("SET_TOKEN", data.data);
          await store.dispatch("ViewTagModule/closeAllTag");
          commit("SET_MENUS", res.data.data.menu);
        }
      }
      return Promise.resolve({ data });
    },

    // 退出登录
    loginOut({ commit }) {
      commit("REMOVE_MENUS");
      commit("REMOVE_USER_INFO");
      commit("REMOVE_TOKEN");
      router.replace("/login");
      // window.location.reload();
      // 重置路由缓存状态
      store.dispatch("AppModule/resetRouteState");
    },
  },
};

export default UserModule;