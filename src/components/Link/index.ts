/*
 * @ModuleName: custon link props
 * @Author: 乐涛
 * @LastEditTime: 2022-07-20 11:11:07
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
  right: {
    type: [Number, String],
    default: 0,
  },
  left: {
    type: [Number, String],
    default: 0,
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