/*
 * @ModuleName: 通用函数
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 09:17:03
 */
import { Md5 as tsMd5 } from "ts-md5";

export class Debounce {
  private timer: any;

  /**
   * 防抖
   * @param fn
   * @param delay
   * @returns
   */
  public use(fn: Function, delay: number): Function {
    const self = this;
    return (...args: any[]) => {
      if (self.timer) {
        clearTimeout(self.timer);
      }
      self.timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
}

export class Throttle {
  private timer: any;

  /**
   * 节流
   * @param fn
   * @param delay
   * @returns
   */
  public use(fn: Function, delay: number): Function {
    const self = this;
    return (...args: any[]) => {
      if (self.timer) {
        return;
      }
      self.timer = setTimeout(() => {
        fn.apply(this, args);
        self.timer = 0;
      }, delay);
    };
  }
}

/** MD5加密 */
export const md5 = (str: string) => tsMd5.hashStr(str);

export { clipboardFunc } from "@/directive/clipboard";
