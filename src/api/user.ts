/*
 * @ModuleName: User
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 17:10:15
 */
import req from "@/utils/request";

export const GetUserData = () => req.Get("user/getUserData");
