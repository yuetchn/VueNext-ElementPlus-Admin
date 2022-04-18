/*
 * @ModuleName: custom link
 * @Author: 乐涛
 * @LastEditTime: 2022-04-18 13:11:55
 */
import { defineComponent } from "vue"
import { props } from "./index"
import style from "./Link.module.scss"

export default defineComponent({
  props,
  setup(props, { slots }) {
    return () => (
      <el-link type={props.type} underline={props.underline} disabled={props.disabled} href={props.href} icon={props.icon} >
        <div class={style.g_link}>
          <div class={style.icon}>
            {slots.icon?.()}
          </div>
          <slot name="default">
            {slots.default?.()}
          </slot>
        </div>
      </el-link>
    )
  },
})