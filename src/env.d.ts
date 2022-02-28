/*
 * @ModuleName: Vite环境变量
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-21 13:26:38
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
