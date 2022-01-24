/*
 * @ModuleName: 路由元数据注解
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 11:41:21
 */
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /** 页面标题 */
    title: string;
    /** 是否缓存 */
    cache?: boolean;
    /** 是否隐藏 */
    hide?: boolean;
    /** 图标 */
    icon?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 外链 */
    link?: string;
    /** 按钮权限 */
    buttonOptions?: { [key: string]: string };
  }
}
