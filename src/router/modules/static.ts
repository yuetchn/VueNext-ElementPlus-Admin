/*
 * @ModuleName: 静态路由
 * @Author: 乐涛
 * @LastEditTime: 2022-01-20 09:26:40
 */
import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/Layout.vue");

const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/test",
    name: "/",
    meta: {
      title: "/",
      hide: true,
    },
  },
  {
    path: "/test",
    component: Layout,
    name: "test",
    redirect: "/test/index",
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "index",
        name: "testIndex",
        component: () => import("@/views/testDemo.vue"),
        meta: {
          title: "测试首页",
        },
      },
      {
        path: "test2",
        name: "test2",
        component: () => import("@/views/testDemo2.vue"),
        meta: {
          title: "测试2",
          hide: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    name: "login",
    meta: {
      title: "登录",
      hide: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "404",
      hide: true,
    },
  },
];

export default staticRoutes;
