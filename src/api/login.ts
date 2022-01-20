/*
 * @ModuleName: Login Api
 * @Author: 乐涛
 * @LastEditTime: 2022-01-14 16:42:32
 */
import req from "@/utils/request";

/**
 * 登录
 * @param data
 * @returns
 */
export const Login = (data: any) => req.Post("Login", data);

/**
 * 获取动态路由树
 * @returns
 */
export const GetTreeMenu = () => req.Get("GetTreeMenu");
