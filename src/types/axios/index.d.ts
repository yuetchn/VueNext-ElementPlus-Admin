/*
 * @ModuleName: Http Request 
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-23 10:38:38
 */
import { AxiosRequestConfig, AxiosResponse } from "axios";

/** Response Data */
export interface IResponseBody<D> {
  code: number
  data: D
  msg: string
  total:number
}

declare module "axios" {
  export interface AxiosInstance {
    // eslint-disable-next-line
    < D= any > (config: AxiosRequestConfig): Promise < AxiosResponse < IResponseBody < D >>> ;
    // eslint-disable-next-line
    < D = any >(url: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < IResponseBody<D> >> ;
  }
}
