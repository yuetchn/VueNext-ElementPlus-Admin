/*
 * @ModuleName: Vite环境变量
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-10-17 13:04:01
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// all js
declare module "*.js";

interface ImportMetaEnv {
  /** BASE服务器地址 */
  VITE_BASE_HOST: string;
  /** 标题 */
  VITE_APP_TITLE: string;
  /** 是否显示Logo标题 */
  VITE_SHOW_LOGO_TITLE: string;
  /** 路由最大缓存数量 */
  VITE_ROUTER_CACHE_MAX: any;
  /** 路由模式 */
  VITE_ROUTER_MODE: string;
  /** Http Request Time Out */
  VITE_HTTP_REQUEST_TIME_OUT: number;
  /** Base Public Path */
  VITE_BASE_PUBLIC_PATH: string;
  // 项目默认起始路由地址
  VITE_DEFAULT_START_ROUTER_PATH: string;
  // 项目默认路由白名单
  VITE_DEFAULT_ROUTER_WRITES: string[];
}
