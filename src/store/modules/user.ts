/*
 * @ModuleName: User Module
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 16:32:34
 */
import { Module } from "vuex";
import { RouteRecordRaw } from "vue-router";
import { GetToken, SetToken, RemoveToken } from "@/utils/cookie";
import { Login } from "@/api/login";
import { GetUserInfo } from "@/api/user";
import router from "@/router";
import RootStates from "@/types/store/storeInterface";
import { store } from "@/store";

export interface UserStates {
  /** token */
  token: string | undefined;
  /** userName */
  userName: string;
  /** avatar */
  avatar: string;
  /** menus */
  menus: RouteRecordRaw[];
}
const UserModule: Module<UserStates, RootStates> = {
  namespaced: true,
  state: {
    token: GetToken(),
    userName: localStorage.getItem("userName") || "",
    avatar: localStorage.getItem("avatar") || "",
    menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus") as any) : [],
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
      localStorage.setItem("userName", userName);
      localStorage.setItem("avatar", avatar);
    },
    REMOVE_USER_INFO(state) {
      state.userName = "";
      state.avatar = "";
      localStorage.removeItem("userName");
      localStorage.removeItem("avatar");
    },
    SET_MENUS(state, menus: RouteRecordRaw[]) {
      // 移除动态路由
      state.menus.forEach((f) => {
        if (!router.hasRoute(f.name as string)) {
          return;
        }
        router.removeRoute(f.name as string);
      });
      state.menus = menus;
      localStorage.setItem("menus", JSON.stringify(menus));
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
      localStorage.removeItem("menus");
    },
  },
  actions: {
    // 登录
    async login({ commit }, dt: { account: string; password: string }) {
      const { data } = await Login(dt);
      if (data.code === 200) {
        // 此处可调用自己的方法获取用户数据，或者通过login接口直接返回数据
        const res = await GetUserInfo(data.data);
        if (res.data.code === 200) {
          commit("SET_USER_INFO", res.data.data);
          commit("SET_TOKEN", data.data);
          commit("SET_MENUS", res.data.data.menu);
          return Promise.resolve({ data });
        }
      }
      return Promise.reject(data);
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
