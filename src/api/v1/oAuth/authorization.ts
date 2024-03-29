/*
 * @ModuleName: auth
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-10-17 09:15:02
 */

import req from "@/utils/request"

/**
 * 登录
 * @param params 
 * @returns 
 */
export const Login = (data: {account:string, password:string}) => req.Post(Login_API, data)
const Login_API = "/v1/authorization/login"