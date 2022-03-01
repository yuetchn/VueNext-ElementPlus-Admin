/*
 * @ModuleName: ChartLine Props
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-01 10:03:58
 */

export default {
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
