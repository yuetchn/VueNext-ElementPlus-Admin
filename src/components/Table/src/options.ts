/*
 * @ModuleName: Table Options
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 11:15:05
 */
import { PropType } from "vue"
import { TableColumns } from "./columns"

export const tableProps = {
  data: Array,
  /** 表格列集合 */
  columns: Array as PropType < TableColumns[] >,
  /** 是否开启分页,页码或者每页条数发生改变会触发 【page-change】 函数 */
  page: {
    type: Boolean,
    default: false,
  },
  /** 分页位置，默认：'left' */
  pageAlign: {
    type: String as PropType < "left" | "center" | "right" >,
    default: "left",
  },
  /** 每页条数 */
  pageSize: {
    type: Number,
    default: 20,
  },
  /** 分页页码 */
  pageNumber: {
    type: Number,
    default: 1,
  },
  /** 总条数 */
  total: {
    type: Number,
    default: 0,
  },
  /** 是否开启拖拽表格，如需禁用某一行，可通过element-plus表格row-class-name动态添加class类名[drag_disabled]到指定行中即可。 */
  drag: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number],
    default: "100%",
  },
  maxHeight: [String, Number],
  stripe: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  size: String,
  fit: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  currentRowKey: {
    type: [String, Number],
    default: "",
  },
  rowClassName: {
    type: [Function, String],
    default: "",
  },
  rowStyle: {
    type: [Function, Object],
    default: {},
  },
  cellClassName: {
    type: [Function, String],
    default: "",
  },
  cellStyle: {
    type: [Function, Object],
    default: {},
  },
  headerRowClassName: {
    type: [Function, String],
    default: "",
  },
  headerRowStyle: {
    type: [Function, Object],
    default: {},
  },
  headerCellClassName: {
    type: [Function, String],
    default: "",
  },
  headerCellStyle: {
    type: [Function, Object],
    default: {},
  },
  rowKey: {
    type: [Function, String],
    default: "",
  },
  emptyText: {
    type: String,
    default: "No Data",
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  expandRowKeys: Array,
  // order: ascending / descending
  defaultSort: Object,
  tooltipEffect: {
    type: String,
    default: "dark",
  },
  showSummary: {
    type: Boolean,
    default: false,
  },
  sumText: {
    type: String,
    default: "合计",
  },
  summaryMethod: Function,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: false,
  },
  indent: {
    type: Number,
    default: 16,
  },
  lazy: Boolean,
  load: Function,
  treeProps: Object,
};
  
export const tableEmits = [
  "select",
  "select-all",
  "selection-change",
  "cell-mouse-enter",
  "cell-mouse-leave",
  "cell-click",
  "cell-dblclick",
  "cell-contextmenu",
  "row-click",
  "row-contextmenu",
  "row-dblclick",
  "header-click",
  "header-contextmenu",
  "sort-change",
  "filter-change",
  "current-change",
  "header-dragend",
  "expand-change",
  "page-change",
  "drag-start",
  "drag-end",
  "update:pageSize",
  "update:pageNumber",
];