/*
 * @ModuleName: i18n
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-22 13:09:35
 */
import { createI18n, useI18n as _use } from "vue-i18n";
import e_zhCN from "element-plus/es/locale/lang/zh-cn";
import e_enUS from "element-plus/es/locale/lang/en";
import store from "@/store";

const modules = import.meta.globEager("./*.ts");
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

const t = (value: string) => {
  if (i18n.global.te(value)) {
    return _t(value);
  }
  return value;
};

export const toggleLocale = (key: string) => {
  store.dispatch("AppModule/setLocale", key)
  i18n.global.locale = key;
};

export const localeTypes = [
  {
    key: "zh-CN",
    name: "中文",
    elementUI: e_zhCN,
  },
  {
    key: "en-US",
    name: "English",
    elementUI: e_enUS,
  },
];

// You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
// 此警告开发者已知晓，并承诺在 9.2.0 版本修复。
const i18n = createI18n({
  // legacy: false, // Composition API 模式
  globalInjection: true, // 全局注册 $t方法
  locale: (store.state as any).AppModule.locale,
  messages: getLangAll(),
});

const _t = i18n.global.t
i18n.global.t = t

export const useI18n = () => ({ ..._use(), t })

export default i18n;