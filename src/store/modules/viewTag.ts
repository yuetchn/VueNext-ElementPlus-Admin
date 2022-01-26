/*
 * @ModuleName: ViewTagModule
 * @Author: 乐涛
 * @LastEditTime: 2022-01-26 15:19:24
 */
import { Module } from "vuex";
import { RouteLocationNormalizedLoaded } from "vue-router";
import RootStates from "@/types/store/storeInterface";

export interface ViewTagStates {
  viewTags: RouteLocationNormalizedLoaded[];
  tag: RouteLocationNormalizedLoaded;
}

const ViewTagModule: Module<ViewTagStates, RootStates> = {
  namespaced: true,
  state: {
    viewTags: [],
    tag: <RouteLocationNormalizedLoaded>{},
  },
  mutations: {
    ADD_VIEW_TAG(state, viewTag: RouteLocationNormalizedLoaded) {
      const index = state.viewTags.findIndex((f) => f.path === viewTag.path);
      index === -1 && state.viewTags.push(viewTag);
    },
    SET_TAG(state, viewTag: RouteLocationNormalizedLoaded) {
      state.tag = viewTag;
    },
    DEL_TAG(state, viewTag: RouteLocationNormalizedLoaded) {
      const index = state.viewTags.findIndex((f) => f.path === viewTag.path);

      index !== -1 && state.viewTags.splice(index, 1);
    },
    CLOSE_ALL_TAG(state) {
      state.viewTags = [];
    },
  },
  actions: {
    addViewTag({ commit }, viewTag: RouteLocationNormalizedLoaded) {
      commit("ADD_VIEW_TAG", viewTag);
    },
    setTag({ commit }, viewTag: RouteLocationNormalizedLoaded) {
      commit("SET_TAG", viewTag);
    },
    delTag({ commit }, viewTag: RouteLocationNormalizedLoaded) {
      commit("DEL_TAG", viewTag);
    },
    closeAllTag({ commit }) {
      commit("CLOSE_ALL_TAG");
    },
  },
  getters: {
    getTag(state) {
      return state.tag || {};
    },
  },
};

export default ViewTagModule;
