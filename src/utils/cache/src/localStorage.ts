/*
 * @ModuleName: Local Storage
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 11:59:30
 */

import { DeepClone } from "@/utils/func"

export const setLocalStorageByObject = (key:string, val:object) => {
  let _val = ""
  _val = DeepClone(val)
  localStorage.setItem(key, JSON.stringify(_val))
}

export const getLocalStorageByObject = <T>(key: string):T|null => {
  let _val = localStorage.getItem(key)
  if (!_val) {
    return null
  }
  try {
    _val = JSON.parse(_val)
  } catch (err) {
    console.error(new Error(`localStorage：the '${ key }' key doesn't exist.`))
    return null
  }
  return _val ? (_val as unknown) as T : null
}

export const setLocalStorageByString = (key:string, val:string) => localStorage.setItem(key, val)
export const getLocalStorageByString = (key: string) => localStorage.getItem(key) 
export const removeLocalStorage = (key:string) => localStorage.removeItem(key)