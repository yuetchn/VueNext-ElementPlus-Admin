/*
 * @ModuleName: i18n
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-09 10:41:57
 */
import { createI18n, useI18n as _use } from "vue-i18n";
import store from "@/store";

const modules = import.meta.globEager("./src/*.ts");
const getLangAll = () => {
  const message: any = {};
  getLangFiles(modules, message);
  return message;
};

/**
 * 获取所有语言文件
 * @param {Object} mList
 */
const getLangFiles = (mList: any, msg: any) => {
  for (const path in mList) {
    if (mList[path].default) {
      //  获取文件名
      const pathName = path.substr(path.lastIndexOf("/") + 1, 5);

      if (msg[pathName]) {
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default,
        };
      } else {
        msg[pathName] = mList[path].default;
      }
    }
  }
};

/**
 * 异步切换语言
 * @param key 
 * @returns 
 */
export const toggleLocaleAsync = async (key: string) => {
  try {
    if (!key) {
      return Promise.resolve()
    }

    await store.dispatch("AppModule/setLocale", key)
    if (i18n.mode === "legacy") {
      i18n.global.locale = key as any
    } else {
      i18n.global.locale.value = key as any
    }
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(new Error("🚧Failed to load language!"))
  }
};

const i18n = createI18n({
  legacy: false, // Composition API 模式
  globalInjection: true, // 全局注册 $t方法
  allowComposition: true,
  fallbackWarn: false,
  locale: (store.state as any).AppModule.locale,
  messages: getLangAll(),
  missing: (_, k: string) => k,
});

export * from "./langs"

export const useI18n = () => ({ ..._use() })

export default i18n;