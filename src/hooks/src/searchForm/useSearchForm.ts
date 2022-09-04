/*
 * @ModuleName: Search Form Hook
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:20:04
 */
 
import { reactive } from "vue"
import { IRequestPageInfo } from "@/types"
import { DeepClone } from "@/utils/func"
// Custom Table Types
export * from "@/components/Table";
// ElementPlus
export * from "element-plus"
// Request Interface
export * from "@/types"

/** Form Search Class */
export class SearchForm < T > implements IRequestPageInfo {
  /** 分页条数 */
  page_size: number;

  /** 分页页码 */
  page_number: number;

  /** 关键字 */
  keyword: string;

  /** 排序字段,默认空 */
  order_field: string;

  /** 排序规则（asc：升序,desc：降序）
   * 默认asc
   * */
  order: "asc" | "desc";

  /** 总条数 */
  total: number;

  /** 查询条件 */
  query: T;

  private _query: T;

  constructor(_query ? : T, _page_size = 20, _page_number = 1, _order_field = "", _order = "asc") {
    this.page_size = _page_size;
    this.page_number = _page_number;
    this.query = _query || {} as any;
    this._query = DeepClone(_query || {} as any);
    this.order_field = _order_field;
    this.order = _order as any;
    this.keyword = "";
    this.total = 0;
  }

  /**
   * Resetting Search default values
   * @returns void
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

  /**
   * 重置页码
   * @returns void
   */
  ResetPage() {
    this.page_number = 1
    this.page_size = 20
  }

  /**
   * 格式化查询
   * @returns IRequestPageInfo & T
   */
  FormatQuery(): IRequestPageInfo & T {
    return {
      page_size: this.page_size,
      page_number: this.page_number,
      keyword: this.keyword,
      order_field: this.order_field,
      order: this.order,
      ...this.query,
    }
  }
}

/**
 * 表单查询 Hook
 * @param query 
 * @param page_size 
 * @param page_number 
 * @param order_field 
 * @param order 
 * @returns 
 */
export const useSearchForm = < T >(query ? : T, page_size?:number, page_number?:number, order_field?:string, order?:string) => reactive(new SearchForm(query, page_size, page_number, order_field, order))