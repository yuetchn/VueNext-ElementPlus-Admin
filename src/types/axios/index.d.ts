/*
 * @ModuleName: Http Request 
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-06-16 10:30:53
 */
import { AxiosRequestConfig, AxiosResponse } from "axios";

/** Response Data */
export interface IResponseBody<D> {
  code: number
  data: D
  msg: string
}

declare module "axios" {
  export interface AxiosInstance {
    // eslint-disable-next-line
    < D= any > (config: AxiosRequestConfig): Promise < AxiosResponse < IResponseBody < D >>> ;
    // eslint-disable-next-line
    < D = any >(url: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < IResponseBody<D> >> ;
  }
}