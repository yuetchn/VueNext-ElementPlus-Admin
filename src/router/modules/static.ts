/*
 * @ModuleName: 静态路由
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 10:16:15
 */
import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/Layout.vue");

const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "/",
    meta: {
      title: "/",
      hide: true,
    },
  },
  {
    path: "/dashboard",
    component: Layout,
    name: "dashboard",
    redirect: "/dashboard/dashboardIndex",
    meta: {
      title: "首页",
      icon: "home",
    },
    children: [
      {
        path: "dashboardIndex",
        name: "dashboardIndex",
        component: () => import("@/views/dashboard/dashboard.vue"),
        meta: {
          title: "综合示例",
          icon: "home",
          affix: true,
          cache: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
    name: "login",
    meta: {
      title: "登录",
      hide: true,
    },
  },
  {
    path: "/redirect",
    name: "Redirect",
    component: Layout,
    meta: {
      title: "Redirect",
      hide: true,
    },
    children: [
      {
        path: ":path(.*)",
        name: "RedirectPath",
        component: () => import("@/views/Redirect/Redirect"),
        meta: {
          title: "RedirectPath",
          hide: true,
          noTag: true,
        },
      },
    ],
  },
  {
    path: "/:path(.*)*",
    name: "NotFound",
    component: () => import("@/views/404/404.vue"),
    meta: {
      title: "404",
      hide: true,
      noTag: true,
    },
  },
];

export const GetStaticRoutes = (routes = staticRoutes) => {
  let count = routes.length;
  routes.forEach((f) => {
    if (f.children) {
      count += GetStaticRoutes(f.children);
    }
  });
  return count;
};

export default staticRoutes;
