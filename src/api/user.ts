/*
 * @ModuleName: User
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-25 15:21:38
 */
import req from "@/utils/request";

/** 获取用户数据 */
export const GetUserData = (data: any) => req.Post("user/getUserData", data);
/** 获取当前登录用户信息 */
export const GetUserInfo = (role :string) => req.Get("user/getUserInfo", { role });
