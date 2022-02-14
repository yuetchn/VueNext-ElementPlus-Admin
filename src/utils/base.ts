/*
 * @ModuleName: Base Import
 * @Author: 乐涛
 * @LastEditTime: 2022-02-14 10:35:52
 */
// Custom Table Types
export * from "@/components/Table";

/** Form Search Type */
export class SearchForm {
  /** 分页条数 */
  pageSize: number;

  /** 分页页码 */
  pageNumber: number;

  /** 总条数 */
  total: number;

  /** 查询条件 */
  query: { [key: string]: any };

  constructor(_query = {}, _pageSize = 20, _pageNumber = 1, _total = 0) {
    this.pageSize = _pageSize;
    this.pageNumber = _pageNumber;
    this.query = _query;
    this.total = _total;
  }

  /**
     * Reset Search
     * @param _query 
     */
  Reset(_query: Object) {
    this.pageNumber = 1;
    if (_query) {
      this.query = _query;
    } else {
      this.query = {};
    }
  }
}
