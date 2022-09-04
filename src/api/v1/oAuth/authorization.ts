/*
 * @ModuleName: auth
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 09:58:54
 */

import { useRequest } from "@/hooks"

const req = useRequest()

/**
 * 登录
 * @param params 
 * @returns 
 */
export const Login = (data: {account:string, password:string}) => req.Post(Login_API, data)
const Login_API = "/v1/authorization/login"