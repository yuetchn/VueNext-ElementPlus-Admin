/*
 * @ModuleName: Base Import
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-29 22:13:05
 */
import { IRequestPageInfo } from "@/types/request"
// Custom Table Types
export * from "@/components/Table";
// ElementPlus
export * from "element-plus"
// Form Search Interface
export * from "@/types/request"

/** Form Search Class */
export class SearchForm<T> implements IRequestPageInfo<T> {
  /** 分页条数 */
  page_size: number;

  /** 分页页码 */
  page_number: number;

  /** 关键字 */
  keyword: string;

  /** 总条数 */
  total: number;

  /** 查询条件 */
  query: T;

  _query: T;

  constructor(_query?:T, _pageSize = 20, _pageNumber = 1, _total = 0) {
    this.page_size = _pageSize;
    this.page_number = _pageNumber;
    this.query = _query || {} as any;
    this._query = _query || {} as any;
    this.total = _total;
    this.keyword = "";
  }

  /**
     * Reset Search
     */
  Reset() {
    this.page_number = 1;
    this.keyword = ""
    if (this._query) {
      this.query = this._query;
    } else {
      this.query = {} as any
    }
  }
}
