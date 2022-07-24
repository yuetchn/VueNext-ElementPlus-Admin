/*
 * @ModuleName: Http Request
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-24 13:50:56
 */

// 可按照实际项目要求进行设定
export interface IRequestPageInfo<T> {
    page_size: number;
    page_number: number;
    keyword: string;
    total: number;
    query: T
}