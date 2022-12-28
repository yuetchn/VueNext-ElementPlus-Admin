/*
 * @ModuleName: Local Storage
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-11-04 09:08:10
 */

import { DeepClone } from "@/utils/func"

export const SetLocalStorageByObject = (key:string, val:object) => {
  const _val = DeepClone(val)
  localStorage.setItem(key, JSON.stringify(_val))
}

export const GetLocalStorageByObject = <T>(key: string):T|null => {
  let _val = localStorage.getItem(key)
  if (!_val) {
    return null
  }
  try {
    _val = JSON.parse(_val)
  } catch (err) {
    // eslint-disable-next-line
    console.error(new Error(`localStorage：the '${ key }' key doesn't exist.`))
    return null
  }
  return _val ? (_val as unknown) as T : null
}

export const SetLocalStorageByString = (key:string, val:string) => localStorage.setItem(key, val)
export const GetLocalStorageByString = (key: string) => localStorage.getItem(key) 
export const RemoveLocalStorage = (key:string) => localStorage.removeItem(key)