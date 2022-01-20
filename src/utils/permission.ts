/*
 * @ModuleName: 权限拦截
 * @Author: 乐涛
 * @LastEditTime: 2022-01-14 17:25:20
 */
import Nprogress from "nprogress";
import router from "@/router";
import { GetToken } from "@/utils/cookie";
import "nprogress/nprogress.css";

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
  next();
});

router.afterEach(() => {
  Nprogress.done();
});
