/*
 * @ModuleName: Clipboard
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 09:28:04
 */
import { Directive } from "vue";

export const clipboard: Directive = {
  mounted(el, bind) {
    switch (bind.arg) {
      case "data":
        el._v_copy_data = bind.value;
        el.onclick = () => {
          navigator.clipboard
          .writeText(el._v_copy_data)
          .then(() => {
            const callback = el._v_copy_success;
            if (callback && Object.prototype.toString.call(el._v_copy_success) === "[object Function]") {
              el._v_copy_success();
            }
          })
          .catch(() => {
            const callback = el._v_copy_error;
            if (callback && Object.prototype.toString.call(el._v_copy_error) === "[object Function]") {
              el._v_copy_error();
            }
          });
        };
        break;

      case "success":
        el._v_copy_success = bind.value;
        break;
      case "error":
        el._v_copy_error = bind.value;
        break;
      default:
        break;
    }
  },
  updated(el, bind) {
    if (bind.arg === "data") {
      el._v_copy_data = bind.value;
    }
  },
};

/** 写入剪切板 */
export const clipboardFunc = (data: string) => navigator.clipboard.writeText(data);

export default clipboard;
