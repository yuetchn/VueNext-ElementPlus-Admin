/*
 * @ModuleName: custom link
 * @Author: 乐涛
 * @LastEditTime: 2022-04-20 15:51:14
 */
import { defineComponent } from "vue"
import { props } from "./index"
import style from "./Link.module.scss"

export default defineComponent({
  props,
  setup(props, { slots }) {
    const svg = <g-svg-icon size={ props.iconSize } name={ props.icon}></g-svg-icon>
    const icon = (
      <div class={ props.align === "left" ? style.icon_left : style.icon_right }>
        {slots.icon?.() || props.icon ? svg : ""}
      </div>
    )
    return () => (
      <el-link type={ props.type } underline={ props.underline } disabled={ props.disabled } href={ props.href } >
        <div class={ style.g_link }>
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