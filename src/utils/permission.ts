/*
 * @ModuleName: 权限拦截
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-11-24 12:02:50
 */
import { computed } from "vue";
import Nprogress from "nprogress";
import router, { GenerateRoutes } from "@/router";
import { GetStaticRoutes } from "@/router/static";
import { GetToken } from "@/utils/cookie";
import "nprogress/nprogress.css";
import store from "@/store";
 
const startRouterPath = import.meta.env.VITE_DEFAULT_START_ROUTER_PATH
const RouterWrite = import.meta.env.VITE_DEFAULT_ROUTER_WRITES;
const StaticRouterCount = computed < number >(() => GetStaticRoutes());

Nprogress.configure({
  showSpinner: false,
});

router.beforeEach(async (to, from, next) => {
  Nprogress.start();
 
  if (!GetToken()) {
    if (RouterWrite.includes(to.path)) {
      return next();
    }
    router.replace(startRouterPath);
    return next(startRouterPath)
  }

  if (to.path === startRouterPath) {
    return next(from.path);
  }

  if (router.getRoutes().length === StaticRouterCount.value) {
    const _startTime = performance.now();
    if (!GenerateRoutes().length) {
      return next()
    }
    store.dispatch("ViewTagModule/initTags");
    // eslint-disable-next-line
    console.info(`🎉Route mounting time：${ performance.now() - _startTime }/ms`)
    return next(to.fullPath);
  }

  next();
});

router.afterEach(() => {
  Nprogress.done();
});