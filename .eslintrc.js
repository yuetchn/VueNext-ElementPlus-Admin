/*
 * @ModuleName:
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-30 13:56:08
 */
module.exports = {
  root: true,
  globals: {
    defineEmits: "readonly",
    defineProps: "readonly",
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:vue/vue3-recommended", "airbnb-base"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 禁用 debugger
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 禁用 console
    "no-bitwise": "off", // 禁用按位运算符
    "no-tabs": "off", // 禁用 tab
    camelcase: 0,
    "@typescript-eslint/no-this-alias": 0,
    "array-element-newline": ["error", "consistent"], // 强制数组元素间出现换行
    indent: ["error", 2, { MemberExpression: 0, SwitchCase: 1, ignoredNodes: ["TemplateLiteral"] }], // 强制使用一致的缩进
    quotes: ["error", "double"], // 强制使用一致的反勾号、双引号或单引号
    "comma-dangle": ["error", "always-multiline"], // 要求或禁止末尾逗号
    "object-curly-spacing": ["error", "always"], // 强制在大括号中使用一致的空格
    "max-len": ["error", 580], // 强制一行的最大长度
    "max-classes-per-file": 0,
    "vue/multi-word-component-names": 0,
    "no-new": "off", // 禁止使用 new 以避免产生副作用
    "linebreak-style": "off", // 强制使用一致的换行风格
    "import/extensions": "off", // 确保在导入路径中统一使用文件扩展名
    "eol-last": "off", // 要求或禁止文件末尾存在空行
    "no-shadow": "off", // 禁止变量声明与外层作用域的变量同名
    "no-unused-vars": "warn", // 禁止出现未使用过的变量
    "import/no-cycle": "off", // 禁止一个模块导入一个有依赖路径的模块回到自己身上
    "arrow-parens": "off", // 要求箭头函数的参数使用圆括号
    // semi: ["error", "always"], // 要求或禁止使用分号代替 ASI
    semi: 0,
    eqeqeq: "off", // 要求使用 === 和 !==
    "no-param-reassign": "off", // 禁止对 function 的参数进行重新赋值
    "import/prefer-default-export": "off", // 如果模块只输入一个名字，则倾向于默认输出
    "no-use-before-define": "off", // 禁止在变量定义之前使用它们，则倾向于默认输出
    "no-continue": "off", // 禁用 continue 语句
    "prefer-destructuring": "off", // 优先使用数组和对象解构
    "no-plusplus": "off", // 禁用一元操作符 ++ 和 --
    "prefer-const": "warn", // 要求使用 const 声明那些声明后不再被修改的变量
    "global-require": "off", // 要求 require() 出现在顶层模块作用域中
    "no-prototype-builtins": "off", // 禁止直接调用 Object.prototypes 的内置属性
    "consistent-return": "off", // 要求 return 语句要么总是指定返回的值，要么不指定
    "one-var-declaration-per-line": "off", // 要求或禁止在变量声明周围换行
    "one-var": "off", // 强制函数中的变量要么一起声明要么分开声明
    "import/named": "off", // 确保命名导入与远程文件中的命名导出相对应
    "object-curly-newline": "off", // 强制大括号内换行符的一致性
    "default-case": "off", // 要求 switch 语句中有 default 分支
    "no-trailing-spaces": "off", // 禁用行尾空格
    "func-names": "off", // 要求或禁止使用命名的 function 表达式
    radix: "off", // 强制在 parseInt() 使用基数参数
    "no-unused-expressions": "off", // 禁止出现未使用过的表达式
    "no-underscore-dangle": "off", // 禁止标识符中有悬空下划线
    "no-nested-ternary": "off", // 禁用嵌套的三元表达式
    "no-restricted-syntax": "off", // 禁用特定的语法
    "no-await-in-loop": "off", // 禁止在循环中出现 await
    "import/no-extraneous-dependencies": "off", // 禁止使用外部包
    "import/no-unresolved": "off", // 确保导入指向一个可以解析的文件/模块
    "template-curly-spacing": ["error", "always"], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    "@typescript-eslint/no-var-requires": "off", // 除import语句外，禁止使用require语句
    "@typescript-eslint/no-empty-function": "off", // 不允许空函数
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "guard-for-in": "off", // 要求 for-in 循环中有一个 if 语句
    "class-methods-use-this": "off", // 强制类方法使用 this
    "vue/html-indent": ["error", 2], // 在<template>中强制一致缩进
    "vue/html-self-closing": "off", // 执行自闭合的风格
    "vue/singleline-html-element-content-newline": "off", // 要求单行元素的内容前后有一个换行符
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 10, // 单行最大允许绑定属性
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "@typescript-eslint/ban-types": 0,
    "vue/require-explicit-emits": 0,
    "vue/component-definition-name-casing": 0,
    "vue/no-v-html": 0, // no-xss
  },
};
