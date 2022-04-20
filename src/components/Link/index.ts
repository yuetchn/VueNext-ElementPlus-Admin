/*
 * @ModuleName: custon link props
 * @Author: 乐涛
 * @LastEditTime: 2022-04-20 15:16:00
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
  /** icon 不适用原生element-plus的icon，仅支持本项目svg-icon */
  icon: {
    type: String,
    default: "",
  },
  iconSize: {
    type: [Number, String],
    default: 16,
  },
}