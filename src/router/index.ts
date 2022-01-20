/*
 * @ModuleName: 路由
 * @Author: 乐涛
 * @LastEditTime: 2022-01-20 09:37:00
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// 静态路由
import staticRoutes from "./modules/static";

// 动态路由,根据后台路由表生成
const dynamicRoutes: RouteRecordRaw[] = [];

export const routes = [...staticRoutes, ...dynamicRoutes];
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
