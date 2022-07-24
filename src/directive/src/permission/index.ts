/*
 * @ModuleName: Permission
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-22 16:22:14
 */
import { Directive } from "vue";
import router from "@/router"

export const permission: Directive = {
  mounted(el, bind) {
    if (bind.arg) {
      switch (bind.arg) {
        case "key":
          el._v_per_key = bind.value
          break;
              
        case "mode":
          el._v_per_mode = bind.value
          break;
        default:
          break;
      }
        
      if (el._v_per_key && el._v_per_mode) {
        perAction(el, el._v_per_key, el._v_per_mode)
      }
      return
    }
    perAction(el, bind.value)
  },
};

const perAction = (el: any, key: string, mode = "delete") => {
  if (!router.currentRoute.value) {
    return 
  }
  const find = router.currentRoute.value.meta.buttonOptions?.find(f => f.key === key)
  if (find) {
    return   
  }
  if (mode === "delete") {
    el.remove() 
  } else if (mode === "disabled") {
    const classList = el.className.split(" ")
    classList.push("is-disabled")
    classList.push("v-per-disabled")
    el.className = classList.join(" ")
    el.disabled = true
  }
}
export default permission;
