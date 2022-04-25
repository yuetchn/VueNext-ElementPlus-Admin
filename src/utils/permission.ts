/*
 * @ModuleName: 权限拦截
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-25 12:14:41
 */
import { computed, watch } from "vue";
import Nprogress from "nprogress";
import { UserStates } from "@/store/modules/user";
import router, { GenerateDynamicRoutes, GenerateStaticRoutes } from "@/router";
import { GetStaticRoutes } from "@/router/static";
import { GetToken } from "@/utils/cookie";
import "nprogress/nprogress.css";
import store from "@/store";
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

  // 角色判断
  if (!((store.state as any).UserModule as UserStates).roles.length) {
    store.dispatch("UserModule/loginOut");
    next()
  } else if (router.getRoutes().length === StaticRouterCount.value) {
    const _startTime = performance.now();
    // 提供动态路由、静态路由两种方式,根据需要选择，可以同时使用也可以两者结合使用。
    // 挂载动态路由
    if (!GenerateDynamicRoutes.value.length) {
      return next()
    }

    // 挂载静态路由
    GenerateStaticRoutes.value

    store.dispatch("ViewTagModule/initTags");
    console.info(`🎉Route mounting time：${ performance.now() - _startTime }/ms`)
    return next(to.fullPath);
  }

  next();
});

router.afterEach(() => {
  Nprogress.done();
});