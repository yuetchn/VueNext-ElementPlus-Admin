/*
 * @ModuleName: Http Request 
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-29 21:38:19
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
    < D > (config: AxiosRequestConfig): Promise < AxiosResponse < IResponseBody < D >>> ;
    // eslint-disable-next-line
    < D >(url: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < IResponseBody < D > >> ;
  }
}
