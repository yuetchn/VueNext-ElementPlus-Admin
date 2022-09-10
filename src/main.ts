/*
 * @ModuleName: Main
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-10 16:45:39
 */
import { createApp } from "vue";
import { Menu } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import ElementPlus from "element-plus";
import App from "@/App.vue";
import "@/utils/permission";

// mock server
// import "@/mock";

import store, { key } from "@/store";
import router from "@/router";
import RegisterDirective from "@/directive";
import RegisterComponent from "@/components";
import RegisterGlobal from "@/utils/global";
import "virtual:svg-icons-register";
import VueI18n from "@/locale";

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(VueI18n);
RegisterDirective(app);
RegisterComponent(app);
RegisterGlobal(app);

// ElementPlus
app.use(ElementPlus);
// Antdv Part Component
app.use(Menu);
app.mount("#app");
