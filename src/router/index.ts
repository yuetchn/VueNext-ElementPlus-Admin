/*
 * @ModuleName: Router
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 16:06:19
 */
import { createRouter, createWebHashHistory } from "vue-router";
// 静态路由
import staticRoutes from "./modules/static";
// import components from "./modules/components";

export const routes = staticRoutes;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
