/*
 * @ModuleName: 环境注解
 * @Author: 乐涛
 * @LastEditTime: 2022-01-13 16:48:09
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
  /** 路由最大缓存数量 */
  VITE_ROUTER_CACHE_MAX: any;
}
