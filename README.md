
<h1 align="center">VueNext-ElementPlus-Admin</h1>
<p align="center">
<img src="https://img.shields.io/badge/vue-3.2.41-23FFC21A" />
<img src="https://img.shields.io/badge/vite-3.2.3-FFC21A" />
<img src="https://img.shields.io/badge/typescript-4.8.4-23FFC21A" />
<img src="https://img.shields.io/badge/element--plus-2.2.17-FFC21A" />
<img src="https://img.shields.io/badge/ant--design--vue-2.2.8-%23FFC21A" />
<img src="https://img.shields.io/badge/license-MIT-FFC21A" />
</p>

# ⚡简介
`VueNext-ElementPlus-Admin` 是一个后台前端解决方案，它基于 [vue3.x](https://v3.cn.vuejs.org/ "vue官网") 和 [element-plus](https://element-plus.gitee.io/zh-CN/ "Element-Plus官网")实现。它使用了前沿的前端技术栈，内置了动态路由，权限验证，提炼了典型的业务模型，模块化开发，提供了丰富的功能组件，内置 `i18n` 国际化解决方案，拥抱 [Vite](https://vitejs.cn/ "Vite") 急速的服务启动以及轻量快速的热重载提高开发效率，可以帮助你快速搭建企业级中后台产品原型。
轻量级框架只保留了基本核心功能，不冗余不需要的功能，可根据业务随意扩展，快速搭建定制的后台应用。

***该项目不支持 `IE` 浏览器***

[Vue 3 官方已经放弃对 IE11 的支持 ](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md)


***

<p align="center">
<img align="center" src="http://www.yuetchn.top/img.png">
</p>

# 💒特性

- ⚡️  速度快
- 🍃  轻量化
- 🧱  模块化
- 📦  组件丰富
- 🚀  高扩展性
- 📠  Typescript
- 🌈  Tsx/Jsx
- 🌎  国际化

# 🎯准备

你需要在本地安装 `node` 和 `git`。本项目技术栈基于 `ES2016>`、`vue3.x`、`vuex@next`、`vue-router@next` 、`vite` 、`axios` 和 `element-plus`,提前了解和学习这些知识会对使用本项目有很大的帮助。

### 文档
[中文文档（持续更新）](http://doc.yuetchn.top)
### 示例

[点击我前往](http://demo.yuetchn.top )

### 相关链接
[Gitee](https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin) |
[GitHub](https://github.com/yuetchn/VueNext-ElementPlus-Admin)

# 🏭功能

- ✅路由（静态/动态）
- ✅缓存
- ✅丰富组件
- ✅权限验证（菜单/按钮/功能）
- ✅多环境变量
- ✅国际化（i18n）
- ✅Utils

# 🔨Volar
[`Volar —— Vue3 完美的配套工具`](https://github.com/johnsoncodehk/volar-plugins)

⚡ Fast Vue Language Support Extension

注意：此插件与 `Vetur` 冲突，需要先禁用 `Vetur`

# 🔌服务端

目前正在从Mock服务陆续迁移，新后台服务使用 <b>`Go语言`</b> 进行编写，目前开发接近尾声，后台服务框架后续会和当前项目合并开源。

# 目录

    ├── public
    │   ├── tinymce
    │   │   ├── langs
    │   │   └── skins
    │   └── favicon.ico
    ├── src
    │   ├── api
    │   │   ├── v1
    │   │   ├── login.ts
    │   │   └── user.ts
    │   ├── assets
    │   │   ├── icons
    │   │   ├── imgs
    │   │   ├── style
    │   │   └── logo.png
    │   ├── components
    │   │   ├── Charts
    │   │   ├── Dialog
    │   │   ├── Editor
    │   │   ├── Link
    │   │   ├── LoadingShade
    │   │   ├── MarkDown
    │   │   ├── Page
    │   │   ├── QrCode
    │   │   ├── SvgIcon
    │   │   ├── Table
    │   │   ├── index.scss
    │   │   └── index.ts
    │   ├── directive
    │   │   ├── src
    │   │   └── index.ts
    │   ├── layout
    │   │   ├── components
    │   │   └── Layout.vue
    │   ├── locale
    │   │   ├── en-US.ts
    │   │   ├── index.ts
    │   │   └── zh-CN.ts
    │   ├── hooks
    │   │   ├── src
    │   │   └── index.ts
    │   ├── mock
    │   │   ├── user
    │   │   └── index.ts
    │   ├── router
    │   │   ├── modules
    │   │   ├── index.ts
    │   │   └── static.ts
    │   ├── store
    │   │   ├── modules
    │   │   └── index.ts
    │   ├── types
    │   │   ├── axios
    │   │   ├── components
    │   │   ├── global
    │   │   ├── request
    │   │   ├── router
    │   │   └── store
    │   ├── utils
    │   │   ├── cache
    │   │   ├── excel
    │   │   ├── func
    │   │   ├── cookie.ts
    │   │   ├── global.ts
    │   │   └── permission.ts
    │   ├── views
    │   │   ├── 404
    │   │   ├── components
    │   │   ├── dashboard
    │   │   ├── login
    │   │   ├── Redirect
    │   │   └── systemManage
    │   ├── App.vue
    │   ├── env.d.ts
    │   └── main.ts
    ├── .env
    ├── .env.development
    ├── .env.production
    ├── .eslintrc.js
    ├── .tslint.json
    ├── index.html
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── vite.config.ts

# 🚧开发

    # 拉取代码仓库到本地
    git clone https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin
    
    # 切换项目目录
    cd VueNext-ElementPlus-Admin
    
    # 安装依赖
    npm i
    or
    yarn

    # 启动项目
    npm run dev
    or
    yarn dev

    # 启动项目 - 生产环境
    npm run serve
    or
    yarn serve
    
浏览器访问地址：[http://localhost:85](http://localhost:85)

# 发布

    # 构建开发环境
    npm run build:dev
    or
    yarn build:dev

    # 构建生产环境
    npm run build:prod
    or
    yarn build:prod

# 其他

    # 代码检查
    npm run lint
    or
    yarn lint

|IE|Edge|Firefox|Google|Node
|-|-|-|-|-|
|non-supported|last 2 versions|last 2 versions|last 2 versions|> 14|

# 🍕支持作者
如果你在使用中或使用过后，觉得框架不错，希望你能帮我点个 ⭐ Star，这将是对我极大的鼓励与支持。

# License

<font size=5>[MIT](https://gitee.com/yuetchn_admin/vue-element-plus-admin/blob/master/LICENSE "MIT")</font>

Copyright (c) 2022-present YuetChn