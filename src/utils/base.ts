/*
 * @ModuleName: Base Import
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-20 10:00:35
 */
import { IRequestPageInfo } from "@/types/request"
import { DeepClone } from "@/utils/func"

// Custom Table Types
export * from "@/components/Table";
// ElementPlus
export * from "element-plus"
// Request Interface
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

  private _query: T;

  constructor(_query?:T, _pageSize = 20, _pageNumber = 1, _total = 0) {
    this.page_size = _pageSize;
    this.page_number = _pageNumber;
    this.query = _query || {} as any;
    this._query = DeepClone(_query || {} as any);
    this.total = _total;
    this.keyword = "";
  }

  /**
   * Resetting Search default values
   */
  Reset() {
    this.page_number = 1;
    this.keyword = ""
    if (this._query) {
      this.query = DeepClone(this._query);
    } else {
      this.query = {} as any
    }
  }

  ResetPage() {
    this.page_number = 1
    this.page_size = 20
  }
}
