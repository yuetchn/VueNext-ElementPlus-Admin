/*
 * @ModuleName: Router
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-25 12:13:33
 */
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import { computed } from "vue";
import store from "@/store";
import { UserStates } from "@/store/modules/user";

// 静态路由
import staticRoutes from "./static";

let UserModule: UserStates

const routerComponents = import.meta.glob("/src/views/**/*.vue");

/**
 * 生成动态路由
 */
export const GenerateDynamicRoutes = computed(() => {
  UserModule = ((store.state as any).UserModule as UserStates)
  return filterRoute(JSON.parse(JSON.stringify(UserModule.menus)), true);
})

/**
 * 生成静态路由
 */
export const GenerateStaticRoutes = computed(() => {
  const _static_routes = import.meta.globEager("./modules/**/*.ts")
  let _r:RouteRecordRaw[] = []
  Object.keys(_static_routes).forEach(f => {
    _r = _r.concat(...[_static_routes[f].default as RouteRecordRaw])
  }) 
  return filterRoute(_r, true);
})

/**
 * 过滤路由
 * @param routes 
 * @param isRoot 
 * @returns 
 */
const filterRoute = (routes: RouteRecordRaw[], isRoot: boolean) => {
  const routers: RouteRecordRaw[] = [];
  routes.forEach((f: RouteRecordRaw) => {
    if (!(f.meta?.roles && f.meta.roles.filter(f => UserModule.roles.indexOf(f) >= 0).length)) {
      return
    }
    if ((f.component as any) === "Layout") {
      f.component = () => import("@/layout/Layout.vue");
    } else if (routerComponents[`/src/views/${ f.component }.vue`]) {
      f.component = routerComponents[`/src/views/${ f.component }.vue`];
    } else {
      console.warn(`失效的路由:[${ f.path }],找不到对应模块:[${ f.component }]`);
      return
    }
    if (f.children) {
      f.children = filterRoute(f.children, false);
    }
    if (isRoot) {
      router.addRoute(f);
    }
    routers.push(f);
  });
  return routers;
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
});

export const routes = staticRoutes
export default router;