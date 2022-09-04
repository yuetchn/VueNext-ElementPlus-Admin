/*
 * @ModuleName: Http Request
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-30 14:14:58
 */

// 可按照实际项目要求进行设定
export interface IRequestPageInfo {
  page_size: number
  page_number: number
  keyword: string
  order_field: string
  order: "asc" | "desc"
}

/** 分页ResponseBody */
export interface IResponsePageInfo < T > {
  page_size: number
  page_number: number
  total: number
  list: T[]
}