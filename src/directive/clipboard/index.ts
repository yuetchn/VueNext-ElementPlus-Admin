/*
 * @ModuleName: Clipboard
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-25 11:44:06
 */
import { Directive } from "vue";

export const clipboard: Directive = {
  mounted(el, bind) {
    switch (bind.arg) {
      case "data":
        el._v_copy_data = bind.value;
        el.onclick = () => {
          clipboardFunc(el._v_copy_data)
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
export const clipboardFunc = (data: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(data);
  }

  const textDom = document.createElement("textarea");
  textDom.innerText = data;
  textDom.style.zIndex = "0";
  textDom.style.top = "-999999px";
  textDom.style.left = "-999999px";
  textDom.style.position = "absolute";
  document.body.appendChild(textDom);
  textDom.select();
  const copyResult = document.execCommand("copy");
  setTimeout(() => {
    document.body.removeChild(textDom);
  }, 100);
  return copyResult ? Promise.resolve() : Promise.reject();
};

export default clipboard;
