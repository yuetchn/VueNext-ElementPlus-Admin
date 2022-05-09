/*
 * @ModuleName: Vite环境变量
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 11:25:40
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
  /** 服务器地址 */
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
}
