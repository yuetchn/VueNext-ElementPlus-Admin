/*
 * @ModuleName: User Module
 * @Author: 乐涛
 * @LastEditTime: 2022-01-20 10:39:24
 */
import { Module } from "vuex";
import { GetToken, SetToken, RemoveToken } from "@/utils/cookie";
import { Login } from "@/api/login";
import router from "@/router";
import RootStates from "@/types/store/storeInterface";
import { store } from "@/store";

export interface UserStates {
  /** Token */
  token: string | undefined;
  /** UserInfo */
  userInfo: any;
}
const UserModule: Module<UserStates, RootStates> = {
  namespaced: true,
  state: {
    token: GetToken(),
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}") || {},
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
      SetToken(token);
    },
    SET_USER_INFO(state, userInfo: any) {
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", userInfo);
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = undefined;
      localStorage.removeItem("userInfo");
    },
  },
  actions: {
    // 登录
    async login({ commit }, dt: { account: string; password: string }) {
      const { data } = await Login(dt);
      if (data.code === 200) {
        commit("SET_TOKEN", data.data);
        return Promise.resolve({ data });
      }
      return Promise.reject(data);
    },

    // 退出登录
    loginOut({ commit }) {
      RemoveToken();
      commit("REMOVE_USER_INFO");
      router.replace("/login");
      window.location.reload();
      // 重置路由缓存状态
      store.dispatch("AppModule/resetRouteState");
    },
  },
};

export default UserModule;
