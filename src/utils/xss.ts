/*
 * @ModuleName: Custom Filter Xss
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-08 09:21:27
 */
import { FilterXSS } from "xss"

// options配置参考：https://github.com/leizongmin/js-xss/blob/master/README.zh.md
const XssOptions = {
  whiteList: {
    div: ["style"],
  },
}

export default (v:string) => new FilterXSS(XssOptions).process(v)