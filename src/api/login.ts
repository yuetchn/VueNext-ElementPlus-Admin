/*
 * @ModuleName: Login Api
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-21 16:44:09
 */
import req from "@/utils/request";

/**
 * 登录
 * @param data
 * @returns
 */
export const Login = (data: any) => req.Post("user/login", data);
