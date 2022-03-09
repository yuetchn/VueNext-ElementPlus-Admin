/*
 * @ModuleName: i18n
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-09 18:03:14
 */
import { createI18n } from "vue-i18n";
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

export const t = (value: string) => {
  // 此处判断切换语言后，控制台会批量警告
  // console.log后又不出现警告
  if (i18n.global.te(value)) {
    return i18n.global.t(value);
  }
  return value;
};

export const toggleLocale = (key: string) => {
  i18n.global.locale = key;
  store.dispatch("AppModule/setLocale", key);
};

export const localeTypes = [
  {
    key: "zh-CN",
    name: "中文",
    disabled: false,
  },
  {
    key: "en-US",
    name: "English",
    disabled: false,
  },
];

// You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
// 此警告开发者已知晓，并承诺在 9.2.0 版本修复。
// Element-Plus、Ant-Design 尚未国际化同步，后期改造
const i18n = createI18n({
  // legacy: false, // Composition API 模式
  globalInjection: true, // 全局注册 $t方法
  locale: (store.state as any).AppModule.locale,
  messages: getLangAll(),
  $t: t,
});

export default i18n;
