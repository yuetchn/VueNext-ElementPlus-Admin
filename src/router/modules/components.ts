/*
 * @ModuleName: 组件展示
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 11:46:52
 */
import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/Layout.vue");

const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/components",
    redirect: "/components/tablePage",
    name: "components",
    component: Layout,
    meta: {
      title: "组件展示",
      icon: "component",
    },
    children: [
      {
        path: "tablePage",
        name: "tablePage",
        component: () => import("@/views/components/tablePage.vue"),
        meta: {
          title: "表格",
          icon: "table",
        },
      },
      {
        path: "richTextEdit",
        name: "richTextEdit",
        component: () => import("@/views/components/richTextEdit.vue"),
        meta: {
          title: "富文本编辑器",
          icon: "richText",
        },
      },
      {
        path: "fileUpload",
        name: "fileUpload",
        component: () => import("@/views/components/fileUpload.vue"),
        meta: {
          title: "文件上传",
          icon: "upload",
        },
      },
      {
        path: "dialog",
        name: "dialog",
        component: () => import("@/views/components/dialog.vue"),
        meta: {
          title: "Dialog",
        },
      },
    ],
  },
  {
    path: "/permission",
    name: "permission",
    component: Layout,
    meta: {
      title: "权限",
      icon: "permission",
    },
    children: [],
  },
  {
    path: "/icon",
    redirect: "/icon/index",
    name: "icon",
    component: Layout,
    meta: {
      title: "Icon图标",
      icon: "icon",
    },
    children: [
      {
        path: "index",
        name: "iconIndex",
        component: () => import("@/views/components/icon.vue"),
        meta: {
          title: "Icon图标",
          icon: "icon",
        },
      },
    ],
  },
  {
    path: "/routerNest",
    redirect: "/routerNest/index",
    name: "routerNest",
    component: Layout,
    meta: {
      title: "路由嵌套",
      icon: "module",
    },
    children: [
      {
        path: "index",
        name: "routerNestIndex",
        component: () => import("@/views/components/dialog.vue"),
        meta: {
          title: "子路由1",
        },
        children: [
          {
            path: "routerNestChildrenIndex",
            name: "routerNestChildrenIndex",
            component: () => import("@/views/components/dialog.vue"),
            meta: {
              title: "子子路由1",
            },
          },
          {
            path: "routerNestChildren2",
            name: "routerNestChildren2",
            component: () => import("@/views/components/dialog.vue"),
            meta: {
              title: "子子路由2",
            },
          },
          {
            path: "routerNestChildren3",
            name: "routerNestChildren3",
            component: () => import("@/views/components/dialog.vue"),
            meta: {
              title: "子子路由3",
            },
          },
        ],
      },
      {
        path: "routerNest2",
        name: "routerNest2",
        component: () => import("@/views/components/dialog.vue"),
        meta: {
          title: "子路由2",
        },
      },
      {
        path: "routerNest3",
        name: "routerNest3",
        component: () => import("@/views/components/dialog.vue"),
        meta: {
          title: "子路由3",
        },
      },
    ],
  },
  {
    path: "/exportExcel",
    name: "exportExcel",
    component: Layout,
    meta: {
      title: "导出Excel",
      icon: "exportExcel",
    },
    children: [
      {
        path: "exportExcelIndex",
        name: "exportExcelIndex",
        component: () => import("@/views/components/exportExcel.vue"),
        meta: {
          title: "导出Excel",
        },
      },
    ],
  },
  {
    path: "/echarts",
    name: "echarts",
    component: Layout,
    meta: {
      title: "图表",
      icon: "echart",
    },
    children: [],
  },
  {
    path: "/pdf",
    name: "pdf",
    component: Layout,
    meta: {
      title: "PDF",
      icon: "pdf",
    },
    children: [],
  },
  {
    path: "/link",
    name: "外链",
    component: Layout,
    redirect: "/link/index",
    meta: {
      title: "外链",
      icon: "link",
    },
    children: [
      {
        path: "index",
        name: "linkIndex",
        component: Layout,
        meta: {
          title: "外链",
          icon: "",
          link: "https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin",
        },
      },
    ],
  },
];

export default staticRoutes;
