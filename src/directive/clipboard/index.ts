/*
 * @ModuleName: Clipboard
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 18:01:33
 */
import { Directive } from "vue";

export const clipboard: Directive = {
  mounted(el, bind) {
    // 通过el绑定点击事件，触发传入的data，通过bing.arg判断v-copy:data还是v-copy:success ,v-copy:error
    console.log("copy", bind);
  },
};

export default clipboard;
