/*
 * @ModuleName: SvgIcon Options
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 11:03:22
 */
export const svgIconProps = {
  /** Svg图标名称 */
  name: {
    type: String,
    default: "",
  },
  /** Svg颜色 */
  color: {
    type: String,
    default: "",
  },
  /** Svg大小 */
  size: {
    type: [Number, String],
    default: 16,
  },
  width: {
    type: [Number, String],
    default: null,
  },
  height: {
    type: [Number, String],
    default: null,
  },
}