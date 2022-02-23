/*
 * @ModuleName: ViewTagModule
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-27 09:52:33
 */
import { Module } from "vuex";
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import RootStates from "@/types/store/storeInterface";
import router from "@/router";

export interface ViewTagStates {
  viewTags: RouteLocationNormalizedLoaded[];
  tag: RouteLocationNormalizedLoaded;
  initTags: RouteLocationNormalizedLoaded[];
}

const ViewTagModule: Module<ViewTagStates, RootStates> = {
  namespaced: true,
  state: {
    viewTags: [],
    tag: <RouteLocationNormalizedLoaded>{},
    initTags: <RouteLocationNormalizedLoaded[]>[],
  },
  mutations: {
    SET_INIT_TAGS(state, viewTags: RouteLocationNormalizedLoaded[]) {
      state.initTags = viewTags;
    },
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
    initTags({ commit }) {
      const getAffixRoutes = (routes: RouteRecordRaw[]) => {
        let rts: RouteLocationNormalizedLoaded[] = [];
        routes.forEach((r) => {
          if (r.meta && r.meta.affix && !r.meta.noTag) {
            rts.push({
              path: r.path,
              name: r.name,
              meta: { ...r.meta },
              query: {},
              params: {},
              matched: [],
              hash: "",
              redirectedFrom: undefined,
              fullPath: r.path,
            });

            if (r.children) {
              rts = [...rts, ...getAffixRoutes(r.children)];
            }
          }
        });
        return rts;
      };

      commit("SET_INIT_TAGS", getAffixRoutes(router.getRoutes()));
    },
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
    getCacheNames(state) {
      return [...state.initTags, ...state.viewTags].filter(f => f.meta?.cache).map(m => m.name)
    },
  },
};

export default ViewTagModule;
