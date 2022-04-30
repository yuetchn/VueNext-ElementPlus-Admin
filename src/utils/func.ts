/*
 * @ModuleName: 通用函数
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-28 10:25:46
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

/**
 * @description 格式化数字
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */
export const formatNumber = (number: number, decimals = 0, decPoint = ".", thousandsSep = ",") => {
  if (number / 1000 < 1) {
    return number
  }
  const s = [];
  let n = (number / 1000).toString();

  // 小数
  let last = "";
  let l = "";
  if (n.includes(".")) {
    l = n.split(".")[1];
    last = l.substring(0, decimals);
    if (decimals - l.length > 0) {
      last += new Array(decimals - l.length + 1).join("0");
    }
    n = n.split(".")[0];
  } else {
    last = new Array(decimals + 1).join("0");
    n = "0";
  }

  if (n === "0") {
    return `0${ decimals !== 0 ? decPoint : "" }${ last }`;
  }
  do {
    n = (parseInt(n) / 1000).toString();
    s.unshift(parseInt(n.split(".")[1]).toString());
    n = n.split(".")[0];
  } while (n.split(".")[0] !== "0" || n !== "0");

  return `${ s.join(thousandsSep) }${ decimals !== 0 ? decPoint : "" }${ last }`;
};

/**
 * 深拷贝对象
 * @param data 
 * @returns 
 */
export const deepClone = (data:any) => {
  const type = Object.prototype.toString.call(data);
  let obj: any
  if (type === "[object Object]") {
    obj = {}
    for (const k in data) {
      obj[k] = deepClone(data[k])
    }
  } else if (type === "[object Array]") {
    obj = []
    data.forEach((f:any, i:number) => {
      obj[i] = deepClone(f)
    })
  } else {
    obj = data
  }
  return obj
}