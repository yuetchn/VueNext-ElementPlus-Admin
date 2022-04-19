/*
 * @ModuleName: custon link props
 * @Author: 乐涛
 * @LastEditTime: 2022-04-19 10:58:35
 */
import { PropType } from "vue"

export const props = {
  type: {
    type: String as PropType<"default"|"primary"|"success"|"warning"|"danger"|"info">,
    default: "default",
  },
  underline: {
    type: Boolean,
    default: true,
  },
  /** 图标显示位置 */
  align: {
    type: String as PropType<"left" | "right">,
    default: "left",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: "",
  },
  /** icon 原生el-link属性 */
  icon: {
    type: [String],
    default: "",
  },
}