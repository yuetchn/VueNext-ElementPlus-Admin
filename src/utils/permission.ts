/*
 * @ModuleName: 权限拦截
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 16:31:26
 */
import { RouteRecordRaw } from "vue-router";
import Nprogress from "nprogress";
import router from "@/router";
import { GetStaticRoutes } from "@/router/modules/static";
import { GetToken } from "@/utils/cookie";
import "nprogress/nprogress.css";
import { store } from "@/store";
import { UserStates } from "@/store/modules/user";

const RouterWrite = ["/login", "/404"];

Nprogress.configure({});

router.beforeEach((to, from, next) => {
  document.title = import.meta.env.VITE_APP_TITLE + (to.meta.title ? ` - ${ to.meta.title }` : "");
  Nprogress.start();

  if (!GetToken()) {
    if (RouterWrite.indexOf(to.path) >= 0) {
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
  if (router.getRoutes().length === GetStaticRoutes()) {
    const dynamicRoutes = ((store.state as any).UserModule as UserStates).menus;
    if (!dynamicRoutes.length) {
      return next();
    }
    const routerComponents = import.meta.glob("/src/views/**/*.vue");
    const registerRoute = (routes: RouteRecordRaw[]) => {
      const routers: RouteRecordRaw[] = [];
      routes.forEach((f: RouteRecordRaw) => {
        if ((f.component as any) === "Layout") {
          f.component = () => import("@/layout/Layout.vue");
        } else {
          f.component = routerComponents[`/src/views/${ f.component }.vue`];
        }
        if (f.children) {
          f.children = registerRoute(f.children);
        }
        routers.push(f);
      });
      return routers;
    };
    const rts = registerRoute(dynamicRoutes);
    rts.forEach((f) => {
      router.addRoute(f);
    });

    return next(to.fullPath);
  }

  // 根据角色限制访问，目前是开放的（不根据角色限制）
  next();
});

router.afterEach(() => {
  Nprogress.done();
});
