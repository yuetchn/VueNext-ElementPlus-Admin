/*
 * @ModuleName: user
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-17 13:42:48
 */
import { IRequestPageInfo, IResponsePageInfo } from "@base"
import req from "@/utils/request"
/**
 * 获取当前登录用户信息
 * @returns 
 */
export const GetCurrentUserInfo = () => req.Get(GetCurrentUserInfo_API)
export const GetCurrentUserInfo_API = "/v1/user/getCurrentUserInfo"

/**
 * 获取用户集合
 * @param params 
 * @returns 
 */
export const GetUserInfoByPage = (params: IRequestPageInfo < any >) => req.Get<IResponsePageInfo<any>>(GetUserInfoByPage_API, params)
export const GetUserInfoByPage_API = "/v1/user/getUserInfoByPage"