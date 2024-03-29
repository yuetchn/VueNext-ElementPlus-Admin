/*
 * @ModuleName: Router
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-11-08 10:28:26
 */
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import { computed } from "vue";
import store from "@/store";
import { UserStates } from "@/store/modules/user";
import { DeepClone } from "@/utils/func";
// 静态路由
import staticRoutes from "./static";

let UserModule: UserStates;

const routerComponents = import.meta.glob("/src/views/**/*.vue");

export const GenerateRoutes = () => (import.meta.env.VITE_ROUTER_MODE === "async" ? generateDynamicRoutes.value : generateStaticRoutes.value);

/**
 * 生成动态路由
 */
const generateDynamicRoutes = computed(() => {
  UserModule = (store.state as any).UserModule as UserStates;
  return registerAsyncRoutes(JSON.parse(JSON.stringify(UserModule.menus)), true);
});

/**
 * 生成静态路由
 */
const generateStaticRoutes = computed(() => {
  UserModule = (store.state as any).UserModule as UserStates;
  const _static_routes = import.meta.globEager<string, any>("./modules/**/*.ts");
  let _r: RouteRecordRaw[] = [];
  Object.keys(_static_routes).forEach((f) => {
    _r = _r.concat(...[_static_routes[f].default as RouteRecordRaw]);
  });
  return registerStaticRoutes(DeepClone(_r), true);
});

/**
 * 注册动态路由组件
 * @param routes
 * @param isRoot
 * @returns
 */
const registerAsyncRoutes = (routes: RouteRecordRaw[], isRoot: boolean): RouteRecordRaw[] => {
  const routers: RouteRecordRaw[] = [];
  routes.forEach((f: RouteRecordRaw) => {
    if ((f.component as any) === "Layout") {
      f.component = () => import("@/layout/Layout.vue");
    } else if (routerComponents[`/src/views/${ f.component }.vue`]) {
      f.component = routerComponents[`/src/views/${ f.component }.vue`];
    } else {
      // eslint-disable-next-line
      console.warn(`失效的路由:[${f.path}],找不到对应模块:[${ f.component }]`);
      return;
    }
    if (f.children) {
      f.children = registerAsyncRoutes(f.children, false);
    }
    if (isRoot) {
      router.addRoute(f);
    }
    routers.push(f);
  });
  return routers;
};

/**
 * 注册静态路由组件
 * @param routes
 * @param isRoot
 * @returns
 */
const registerStaticRoutes = (routes: RouteRecordRaw[], isRoot: boolean): RouteRecordRaw[] => {
  const routers: RouteRecordRaw[] = [];
  routes.forEach((f: RouteRecordRaw) => {
    if (!UserModule.menus.includes(f.path)) {
      return;
    }
    if (f.children) {
      f.children = registerStaticRoutes(f.children, false);
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
    return { top: 0 };
  },
});

export const routes = staticRoutes;
export default router;
