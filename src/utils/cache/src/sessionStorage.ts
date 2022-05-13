/*
 * @ModuleName: Session Storage
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-13 18:10:21
 */
import { DeepClone } from "@/utils/func"

export const SetSessionStorageByObject = (key:string, val:object) => {
  let _val = ""
  _val = DeepClone(val)
  sessionStorage.setItem(key, JSON.stringify(_val))
}
  
export const GetSessionStorageByObject = <T>(key: string):T|null => {
  let _val = sessionStorage.getItem(key)
  if (!_val) {
    return null
  }
  try {
    _val = JSON.parse(_val)
  } catch (err) {
    console.error(new Error(`sessionStorage：the '${ key }' key doesn't exist.`))
    return null
  }
  return _val ? (_val as unknown) as T : null
}

export const SetSessionStorageByString = (key:string, val:string) => sessionStorage.setItem(key, val)
export const GetSessionStorageByString = (key: string) => sessionStorage.getItem(key)
export const RemoveSessionStorage = (key:string) => sessionStorage.removeItem(key)