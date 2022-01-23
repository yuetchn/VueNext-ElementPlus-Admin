/*
 * @ModuleName: User
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 13:26:11
 */
import req from "@/utils/request";

export const GetUserData = (data:any) => req.Post("user/getUserData", data);

export const GetUserInfo = () => req.Get("user/getUserInfo")