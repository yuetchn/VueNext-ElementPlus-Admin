/*
 * @ModuleName: custon link props
 * @Author: 乐涛
 * @LastEditTime: 2022-04-18 14:13:08
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
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: "",
  },
  icon: {
    type: [String],
    default: "",
  },
}