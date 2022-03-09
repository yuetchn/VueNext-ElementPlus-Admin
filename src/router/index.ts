/*
 * @ModuleName: Router
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-08 20:32:27
 */
import { createRouter, createWebHashHistory } from "vue-router";
// 静态路由
import staticRoutes from "./modules/static";
// import components from "./modules/components";

export const routes = staticRoutes;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
});

export default router;