/*
 * @ModuleName: 权限拦截
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-22 13:11:50
 */
import { computed, watch } from "vue";
import { RouteRecordRaw } from "vue-router";
import Nprogress from "nprogress";
import router from "@/router";
import { GetStaticRoutes } from "@/router/modules/static";
import { GetToken } from "@/utils/cookie";
import "nprogress/nprogress.css";
import store from "@/store";
import { UserStates } from "@/store/modules/user";
import locale from "@/locale";

const { t } = locale.global;
const RouterWrite = ["/login", "/404"];
const StaticRouterCount = computed < number >(() => GetStaticRoutes());
let NowRoute: any = null;
Nprogress.configure({
  showSpinner: false,
});

watch(
  () => (store.state as any).AppModule.locale,
  () => {
    document.title = (NowRoute.meta.title ? `${ t(NowRoute.name?.toString() || "") === NowRoute.name ? NowRoute.meta.title : t(NowRoute.name?.toString() || "") } - ` : "")
      + import.meta.env.VITE_APP_TITLE;
  },
);

router.beforeEach((to, from, next) => {
  NowRoute = to;
  document.title = (to.meta.title ? `${ t(to.name?.toString() || "") === to.name ? to.meta.title : t(to.name?.toString() || "") } - ` : "")
    + import.meta.env.VITE_APP_TITLE;
  Nprogress.start();

  if (!GetToken()) {
    if (RouterWrite.includes(to.path)) {
      next();
      return;
    }
    router.replace("/login");
    return;
  }

  if (to.path === "/login") {
    next(from.path);
    return;
  }

  // 挂载动态路由
  if (router.getRoutes().length === StaticRouterCount.value) {
    const _startTime = performance.now();
    const dynamicRoutes = ((store.state as any).UserModule as UserStates).menus;
    if (!dynamicRoutes.length) {
      return next();
    }
    const routerComponents = import.meta.glob("/src/views/**/*.vue");
    const registerRoute = (routes: RouteRecordRaw[], isRoot: boolean) => {
      const routers: RouteRecordRaw[] = [];
      routes.forEach((f: RouteRecordRaw) => {
        if ((f.component as any) === "Layout") {
          f.component = () => import("@/layout/Layout.vue");
        } else if (routerComponents[`/src/views/${ f.component }.vue`]) {
          f.component = routerComponents[`/src/views/${ f.component }.vue`];
        } else {
          console.warn(`失效的路由:[${ f.path }],找不到对应模块:[${ f.component }]`);
          return;
        }
        if (f.children) {
          f.children = registerRoute(f.children, false);
        }
        if (isRoot) {
          router.addRoute(f);
        }
        routers.push(f);
      });
      return routers;
    };
    registerRoute(dynamicRoutes, true);
    store.dispatch("ViewTagModule/initTags");
    console.info(`🎉Route mounting time：${ performance.now() - _startTime }/ms`)
    return next(to.fullPath);
  }

  // 根据角色限制访问，目前是开放的（不根据角色限制）
  next();
});

router.afterEach(() => {
  Nprogress.done();
});