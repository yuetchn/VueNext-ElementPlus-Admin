/*
 * @ModuleName: custom link
 * @Author: 乐涛
 * @LastEditTime: 2022-04-19 10:53:10
 */
import { defineComponent } from "vue"
import { props } from "./index"
import style from "./Link.module.scss"

export default defineComponent({
  props,
  setup(props, { slots }) {
    const icon = (
      <div class={style.icon_left}>
        {slots.icon?.()}
      </div>
    )
    return () => (
      <el-link type={props.type} underline={props.underline} disabled={props.disabled} href={props.href} icon={props.icon} >
        <div class={style.g_link}>
          { props.align === "left" ? icon : ""}
          <slot name="default">
            {slots.default?.()}
          </slot>
          { props.align === "right" ? icon : ""}
        </div>
      </el-link>
    )
  },
})