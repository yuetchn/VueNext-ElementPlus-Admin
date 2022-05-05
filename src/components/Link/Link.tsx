/*
 * @ModuleName: custom link
 * @Author: 乐涛
 * @LastEditTime: 2022-05-05 12:48:56
 */
import { defineComponent } from "vue"
import { props } from "./index"

export default defineComponent({
  props,
  setup(props, { slots }) {
    const svg = <g-svg-icon size={ props.iconSize } name={ props.icon}></g-svg-icon>
    const icon = (
      <div class={ props.align === "left" ? "g_link_icon_left" : "g_link_icon_right" }>
        {slots.icon?.() || props.icon ? svg : ""}
      </div>
    )
    return () => (
      <el-link type={ props.type } underline={ props.underline } disabled={ props.disabled } href={ props.href } >
        <div class='g_link'>
          { props.align === "left" ? icon : ""}
          <slot name="default">
            { slots.default?.() }
          </slot>
          { props.align === "right" ? icon : ""}
        </div>
      </el-link>
    )
  },
})