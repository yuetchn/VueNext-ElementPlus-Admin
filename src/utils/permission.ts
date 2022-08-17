/*
 * @ModuleName: 权限拦截
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-09 10:39:25
 */
import { computed, watch } from "vue";
import Nprogress from "nprogress";
import router, { GenerateRoutes } from "@/router";
import { GetStaticRoutes } from "@/router/static";
import { GetToken } from "@/utils/cookie";
import "nprogress/nprogress.css";
import store from "@/store";
import locale, { toggleLocaleAsync } from "@/locale";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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

router.beforeEach(async (to, from, next) => {
  NowRoute = to;
  document.title = (to.meta.title ? `${ t(to.name?.toString() || "") === to.name ? to.meta.title : t(to.name?.toString() || "") } - ` : "")
    + import.meta.env.VITE_APP_TITLE;
  Nprogress.start();

  // 侦听语言切换
  await toggleLocaleAsync(to.query.lang as string)

  if (!GetToken()) {
    if (RouterWrite.includes(to.path)) {
      return next();
    }
    router.replace("/login");
    return next("/login")
  }

  if (to.path === "/login") {
    return next(from.path);
  }

  if (router.getRoutes().length === StaticRouterCount.value) {
    const _startTime = performance.now();
    if (!GenerateRoutes().length) {
      return next()
    }
    store.dispatch("ViewTagModule/initTags");
    console.info(`🎉Route mounting time：${ performance.now() - _startTime }/ms`)
    return next(to.fullPath);
  }

  next();
});

router.afterEach(() => {
  Nprogress.done();
});