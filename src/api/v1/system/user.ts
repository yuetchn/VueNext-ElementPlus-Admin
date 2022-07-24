/*
 * @ModuleName: user
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-21 11:12:35
 */
import req from "@/utils/request"

/**
 * 获取当前登录用户信息
 * @returns 
 */
export const GetCurrentUserInfo = () => req.Get(GetCurrentUserInfo_API)
export const GetCurrentUserInfo_API = "/v1/user/getCurrentUserInfo"