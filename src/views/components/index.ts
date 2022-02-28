/*
 * @ModuleName: help export
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 15:13:26
 */
import { TableColumns } from "@base";

const PropertyColumns = <TableColumns[]>[
  {
    label: "属性",
    prop: "name",
  },
  {
    label: "说明",
    prop: "desc",
  },
  {
    label: "类型",
    prop: "type",
  },
  {
    label: "可选值",
    prop: "options",
  },
  {
    label: "默认值",
    prop: "default",
  },
];

const FuncColumns = <TableColumns[]>[
  {
    label: "方法名",
    prop: "name",
  },
  {
    label: "说明",
    prop: "desc",
  },
  {
    label: "类型",
    prop: "type",
  },
  {
    label: "回调参数",
    prop: "default",
  },
];

const SlotColumns = <TableColumns[]>[
  {
    label: "插槽名",
    prop: "name",
  },
  {
    label: "说明",
    prop: "desc",
  },
  {
    label: "子标签",
    prop: "options",
  },
];
export default {
  PropertyColumns,
  FuncColumns,
  SlotColumns,
};
