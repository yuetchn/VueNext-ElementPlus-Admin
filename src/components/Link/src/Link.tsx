/*
 * @ModuleName: custom link
 * @Author: 乐涛
 * @LastEditTime: 2022-07-25 11:09:58
 */
import { defineComponent } from "vue"
import { linkProps } from "./options"

export default defineComponent({
  props: linkProps,
  setup(props, { slots }) {
    const svg = <g-svg-icon size={ props.iconSize } name={ props.icon}></g-svg-icon>
    const icon = (
      <div class={ props.align === "left" ? "g_link_icon_left" : "g_link_icon_right" }>
        {slots.icon?.() || props.icon ? svg : ""}
      </div>
    )
    return () => (
      <el-link style={`margin-left:${ props.left }px;margin-right:${ props.right }px;`} type={ props.type } underline={ props.underline } disabled={ props.disabled } href={ props.href } >
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