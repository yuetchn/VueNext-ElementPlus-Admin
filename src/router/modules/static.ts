/*
 * @ModuleName: 静态路由
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 10:58:10
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
          title: "首页",
          icon: "home",
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
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404/404.vue"),
    meta: {
      title: "404",
      hide: true,
    },
  },
];

export default staticRoutes;
