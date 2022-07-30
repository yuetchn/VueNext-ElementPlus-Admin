/*
 * @ModuleName: Chart Options
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 11:04:48
 */
export const chartProps = {
  /** 图表宽度 */
  width: {
    type: [String, Number],
    default: "auto",
  },
  /** 图表高度 */
  height: {
    type: [String, Number],
    default: "auto",
  },
  /** Options */
  options: {
    type: Object,
    default: () => ({}),
  },
};
