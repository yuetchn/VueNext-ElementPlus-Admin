/*
 * @ModuleName: 组件展示
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-25 15:31:05
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
          icon: "dialog",
        },
      },
    ],
  },
  {
    path: "/clipboard",
    name: "clipboard",
    component: Layout,
    meta: {
      title: "剪切板",
      icon: "clipboard",
    },
    children: [
      {
        path: "clipboardIndex",
        name: "clipboardIndex",
        component: () => import("@/views/components/clipboard.vue"),
        meta: {
          title: "剪切板",
          icon: "clipboard",
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
    children: [
      {
        path: "test",
        name: "permissionTest",
        component: () => import("@/views/components/permission/test.vue"),
        meta: {
          title: "菜单权限",
          icon: "permission",
        },
      },
    ],
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
          icon: "module",
        },
        children: [
          {
            path: "routerNestChildrenIndex",
            name: "routerNestChildrenIndex",
            component: () => import("@/views/components/dialog.vue"),
            meta: {
              title: "子子路由1",
              icon: "module",
            },
          },
          {
            path: "routerNestChildren2",
            name: "routerNestChildren2",
            component: () => import("@/views/components/dialog.vue"),
            meta: {
              title: "子子路由2",
              icon: "module",
            },
          },
          {
            path: "routerNestChildren3",
            name: "routerNestChildren3",
            component: () => import("@/views/components/dialog.vue"),
            meta: {
              title: "子子路由3",
              icon: "module",
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
          icon: "module",
        },
      },
      {
        path: "routerNest3",
        name: "routerNest3",
        component: () => import("@/views/components/dialog.vue"),
        meta: {
          title: "子路由3",
          icon: "module",
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
          icon: "exportExcel",
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
    children: [
      {
        path: "chartLine",
        name: "chartLine",
        component: () => import("@/views/components/echarts/chartLine.vue"),
        meta: {
          title: "Line",
          icon: "echart",
        },
      },
    ],
  },
  {
    path: "/error",
    name: "error",
    component: Layout,
    redirect: "/error/404Index",
    meta: {
      title: "错误页面",
      icon: "404",
    },
    children: [
      {
        path: "404Index",
        name: "404Index",
        component: () => import("@/views/404/404.vue"),
        meta: {
          title: "404",
          icon: "404",
        },
      },
    ],
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
          icon: "link",
          link: "https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin",
        },
      },
    ],
  },
];

export default staticRoutes;
