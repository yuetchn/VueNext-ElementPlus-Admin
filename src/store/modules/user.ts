/*
 * @ModuleName: User Module
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 15:17:17
 */
import { Module } from "vuex";
import { GetToken, SetToken, RemoveToken } from "@/utils/cookie";
import { Login } from "@/api/login";
import { GetUserInfo } from "@/api/user"
import router from "@/router";
import RootStates from "@/types/store/storeInterface";
import { store } from "@/store";

export interface UserStates {
  /** Token */
  token: string | undefined;
  /** userName */
  userName: string;
  /** avatar */
  avatar: string;
}
const UserModule: Module < UserStates, RootStates > = {
  namespaced: true,
  state: {
    token: GetToken(),
    userName: localStorage.getItem("userName") || "",
    avatar: localStorage.getItem("avatar") || "",
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
      SetToken(token);
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
  },
  actions: {
    // 登录
    async login({ commit }, dt: { account: string;password: string }) {
      const { data } = await Login(dt);
      if (data.code === 200) {
        const res = await GetUserInfo();
        if (res.data.code === 200) {
          commit("SET_USER_INFO", res.data.data)
          commit("SET_TOKEN", data.data);
          return Promise.resolve({ data });
        }
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