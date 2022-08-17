/*
 * @ModuleName: Http Request 
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-17 13:41:58
 */
import { AxiosRequestConfig, AxiosResponse } from "axios";

 /** Response Data */
 interface IAxiosResponseBody < T > {
   code: number
   data: T
   msg: string
 }

declare module "axios" {
  export interface AxiosInstance {
    // eslint-disable-next-line
    < D = any > (config: AxiosRequestConfig): Promise < AxiosResponse < IAxiosResponseBody < D >>> ;
    // eslint-disable-next-line
    < D = any >(url: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < IAxiosResponseBody < D > >> ;
  }
}
