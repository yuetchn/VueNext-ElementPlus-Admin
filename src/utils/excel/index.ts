/*
 * @ModuleName: Export Excel
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 10:56:09
 */
import { exportJson2Excel } from "./excel";

/**
 * ExportJsonExcel
 * @param headers
 * @param data
 * @param fileName
 */
export const ExportJsonExcel = (headers: Array<string>, data: Array<any>, fileName = "exportExcel") => {
  const _formatData = data.map(d => headers.map(h => d[h]))
  exportJson2Excel(headers, _formatData, fileName);
};
