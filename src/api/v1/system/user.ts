/*
 * @ModuleName: user
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:11:17
 */
import { IRequestPageInfo, IResponsePageInfo } from "@/types"
import { useRequest } from "@/hooks"

const req = useRequest()

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
export const GetUserInfoByPage = (params: IRequestPageInfo) => req.Get<IResponsePageInfo<any>>(GetUserInfoByPage_API, params)
export const GetUserInfoByPage_API = "/v1/user/getUserInfoByPage"

/**
 * 获取用户详情
 * @param id 
 * @returns 
 */
export const GetUserInfoByID = (id: number) => req.Get(GetUserInfoByID_API, { id })
export const GetUserInfoByID_API = "/v1/user/getUserInfoById"

/**
 * 新增/修改用户
 * @param data 
 * @returns 
 */
export const SaveOrUpdateUser = (data: any) => req.Post(SaveOrUpdateUser_API, data)
export const SaveOrUpdateUser_API = "/v1/user/saveOrUpdateUser"