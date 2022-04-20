/*
 * @ModuleName: User
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-21 07:35:18
 */
import { mock } from "mockjs";

const adminMenu = [
  {
    path: "/components",
    redirect: "/components/tablePage",
    name: "components",
    component: "Layout",
    meta: {
      title: "组件展示",
      icon: "component",
    },
    children: [
      {
        path: "tablePage",
        name: "tablePage",
        component: "components/tablePage",
        meta: {
          title: "表格",
          icon: "table",
          // affix: 1,
          cache: 1,
        },
      },
      {
        path: "richTextEdit",
        name: "richTextEdit",
        component: "components/richTextEdit",
        meta: {
          title: "富文本编辑器",
          icon: "richText",
        },
      },
      {
        path: "index",
        name: "markdownIndex",
        component: "components/markdown",
        meta: {
          title: "MarkDown",
          icon: "markdown",
        },
      },
      {
        path: "fileUpload",
        name: "fileUpload",
        component: "components/fileUpload",
        meta: {
          title: "文件上传",
          icon: "upload",
        },
      },
      {
        path: "dialog",
        name: "dialog",
        component: "components/dialog",
        meta: {
          title: "弹窗",
          icon: "dialog",
        },
      },
      {
        path: "qrCode",
        name: "qrCode",
        component: "components/qrCode",
        meta: {
          title: "二维码",
          icon: "qrCode",
        },
      },
      {
        path: "linkComponent",
        name: "linkComponent",
        component: "components/link",
        meta: {
          title: "链接",
          icon: "link",
        },
      },
    ],
  },
  {
    path: "/clipboard",
    name: "clipboard",
    component: "Layout",
    meta: {
      title: "剪切板",
      icon: "clipboard",
    },
    children: [
      {
        path: "clipboardIndex",
        name: "clipboardIndex",
        component: "components/clipboard",
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
    component: "Layout",
    meta: {
      title: "权限",
      icon: "permission",
    },
    children: [
      {
        path: "test",
        name: "permissionTest",
        component: "components/permission/test",
        meta: {
          title: "菜单权限",
          icon: "permission",
        },
      },
      {
        path: "test2",
        name: "permissionTest2",
        component: "components/permission/test2",
        meta: {
          title: "菜单权限2",
          icon: "permission",
        },
      },
    ],
  },
  {
    path: "/icon",
    redirect: "/icon/index",
    name: "icon",
    component: "Layout",
    meta: {
      title: "Icon",
      icon: "icon",
    },
    children: [
      {
        path: "index",
        name: "iconIndex",
        component: "components/icon",
        meta: {
          title: "Icon",
          icon: "icon",
        },
      },
    ],
  },
  {
    path: "/verify",
    redirect: "/verify/index",
    name: "verify",
    component: "Layout",
    meta: {
      title: "正则验证",
      icon: "verify",
    },
    children: [
      {
        path: "index",
        name: "verifyIndex",
        component: "components/verifys",
        meta: {
          title: "正则验证",
          icon: "verify",
        },
      },
    ],
  },
  {
    path: "/xss",
    redirect: "/xss/index",
    name: "xss",
    component: "Layout",
    meta: {
      title: "Xss注入",
      icon: "xss",
    },
    children: [
      {
        path: "index",
        name: "xssIndex",
        component: "components/xss",
        meta: {
          title: "Xss注入",
          icon: "xss",
        },
      },
    ],
  },
  {
    path: "/routerNest",
    redirect: "/routerNest/index",
    name: "routerNest",
    component: "Layout",
    meta: {
      title: "路由嵌套",
      icon: "module",
    },
    children: [
      {
        path: "index",
        name: "routerNestIndex",
        component: "components/dialog",
        meta: {
          title: "子路由1",
          icon: "module",
        },
        children: [
          {
            path: "routerNestChildrenIndex",
            name: "routerNestChildrenIndex",
            component: "components/dialog",
            meta: {
              title: "子子路由1",
              icon: "module",
            },
          },
          {
            path: "routerNestChildren2",
            name: "routerNestChildren2",
            component: "components/dialog",
            meta: {
              title: "子子路由2",
              icon: "module",
            },
          },
          {
            path: "routerNestChildren3",
            name: "routerNestChildren3",
            component: "components/dialog",
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
        component: "components/dialog",
        meta: {
          title: "子路由2",
          icon: "module",
        },
      },
      {
        path: "routerNest3",
        name: "routerNest3",
        component: "components/dialog",
        meta: {
          title: "子路由3",
          icon: "module",
        },
      },
    ],
  },
  {
    path: "/locale",
    name: "locale",
    component: "Layout",
    meta: {
      title: "国际化",
      icon: "locale",
    },
    children: [
      {
        path: "localeIndex",
        name: "localeIndex",
        component: "components/locale",
        meta: {
          title: "国际化",
          icon: "locale",
        },
      },
    ],
  },
  {
    path: "/exportExcel",
    name: "exportExcel",
    component: "Layout",
    meta: {
      title: "导出Excel",
      icon: "exportExcel",
    },
    children: [
      {
        path: "exportExcelIndex",
        name: "exportExcelIndex",
        component: "components/exportExcel",
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
    component: "Layout",
    meta: {
      title: "图表",
      icon: "echart",
    },
    children: [
      {
        path: "chartLine",
        name: "chartLine",
        component: "components/echarts/chartLine",
        meta: {
          title: "Line",
          icon: "echart",
        },
      },
    ],
  },
  {
    path: "/cache",
    name: "cache",
    component: "Layout",
    meta: {
      title: "缓存",
      icon: "cache",
    },
    children: [
      {
        path: "cacheIndex",
        name: "cacheIndex",
        component: "components/cache",
        meta: {
          title: "缓存",
          icon: "cache",
        },
      },
    ],
  },
  {
    path: "/error",
    name: "error",
    component: "Layout",
    redirect: "/error/404Index",
    meta: {
      title: "错误页面",
      icon: "404",
    },
    children: [
      {
        path: "404Index",
        name: "404Index",
        component: "404/404",
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
    component: "Layout",
    meta: {
      title: "PDF",
      icon: "pdf",
    },
    children: [],
  },
  {
    path: "/link",
    name: "link",
    component: "Layout",
    redirect: "/link/index",
    meta: {
      title: "外链",
      icon: "link",
    },
    children: [
      {
        path: "index",
        name: "linkIndex",
        component: "Layout",
        meta: {
          title: "外链",
          icon: "link",
          link: "https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin",
        },
      },
    ],
  },
  {
    path: "/user",
    component: "components/user",
    name: "user",
    meta: {
      title: "个人中心",
      hide: true,
    },
  },
];
const testMenu = [
  {
    path: "/components",
    redirect: "/components/tablePage",
    name: "components",
    component: "Layout",
    meta: {
      title: "组件展示",
      icon: "component",
      hide: false,
    },
    children: [
      {
        path: "tablePage",
        name: "tablePage",
        component: "components/tablePage",
        meta: {
          title: "表格",
          icon: "table",
        },
      },
    ],
  },
  {
    path: "/permission",
    name: "permission",
    component: "Layout",
    meta: {
      title: "权限",
      icon: "permission",
    },
    children: [
      {
        path: "test2",
        name: "permissionTest2",
        component: "components/permission/test2",
        meta: {
          title: "菜单权限2",
          icon: "permission",
        },
      },
    ],
  },
  {
    path: "/user",
    component: "components/user.vue",
    name: "user",
    meta: {
      title: "个人中心",
      hide: true,
    },
  },
];

export const getUserData = (data: any) => {
  const body = JSON.parse(data.body);
  return mock({
    code: 200,
    [`data|${ body.pageSize }`]: [
      {
        id: [`@integer(${ body.pageSize * body.pageNumber },10000)`],
        name: "@name()",
        address: "@region()",
        email: "@email()",
        status: "@pick([{type:'danger',label:'异常'},{type:'success',label:'正常'},{type:'warning',label:'质疑'},{type:'info',label:'未知'}])",
      },
    ],
    info: "操作成功",
    total: 10000,
  });
};

export const getUserInfo = (data: any) => {
  const path = data.url.split("?");
  const params = path[1]
  .replace(/^[^&]*=/, "")
  .replace(/&(.*)=/, ",")
  .split(",");
  return {
    code: 200,
    info: "操作成功",
    data: {
      userName: params[0],
      avatar: "http://www.baidu.com",
      menu: params[0] === "admin" ? adminMenu : testMenu,
    },
  };
};
