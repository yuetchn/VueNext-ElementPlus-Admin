/*
 * @ModuleName: Router
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 14:15:35
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// 静态路由
import staticRoutes from "./modules/static";
import components from "./modules/components"

// 动态路由,根据后台路由表生成
const dynamicRoutes: RouteRecordRaw[] = [];

export const routes = [...staticRoutes, ...components, ...dynamicRoutes];
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
