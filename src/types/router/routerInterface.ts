/*
 * @ModuleName: 路由元数据注解
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 14:48:45
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
    /** 序号，排序使用，目前未使用到故未针对此属性做出对应的操作 */
    // order:0,
    /** 外链 */
    link?: string;
    /** 按钮权限 */
    buttonOptions?: { [key: string]: string };
  }
}
