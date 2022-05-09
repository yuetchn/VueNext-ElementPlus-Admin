/*
 * @ModuleName: Session Storage
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 11:23:11
 */
import { DeepClone } from "@/utils/func"

export const setSessionStorageByObject = (key:string, val:object) => {
  let _val = ""
  _val = DeepClone(val)
  sessionStorage.setItem(key, _val)
}
  
export const getSessionStorageByObject = <T>(key: string):T|null => {
  let _val = sessionStorage.getItem(key)
  if (!_val) {
    return null
  }
  try {
    _val = JSON.parse(_val)
  } catch (err) {
    console.error(new Error("sessionStorage：key is null"))
    return null
  }
  return _val ? (_val as unknown) as T : null
}

export const setSessionStorageByString = (key:string, val:string) => sessionStorage.setItem(key, val)
export const getSessionStorageByString = (key: string) => sessionStorage.getItem(key)
export const removeSessionStorage = (key:string) => sessionStorage.removeItem(key)