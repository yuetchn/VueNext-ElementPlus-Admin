/*
 * @ModuleName: User
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 17:29:24
 */
import req from "@/utils/request";

/** 获取用户数据 */
export const GetUserData = (data:any) => req.Post("user/getUserData", data);
/** 获取当前登录用户信息 */
export const GetUserInfo = () => req.Get("user/getUserInfo")