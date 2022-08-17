/*
 * @ModuleName: Http Request
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-17 13:42:02
 */

// 可按照实际项目要求进行设定
export interface IRequestPageInfo<T> {
    page_size: number;
    page_number: number;
    keyword: string;
    total: number;
    query: T
}

/** 分页ResponseBody */
export interface IResponsePageInfo<T>{
    page_size: number
    page_number: number
    total: number
    list: T[]
}
