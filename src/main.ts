/*
 * @ModuleName: Main
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 16:47:21
 */
import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import "@/utils/permission";
import router from "./router";

// mock server
import "@/mock"

import { GlobalMixin } from "../src/utils/mixin";
import { store, key } from "./store";
import RegisterElement from "@/plugins/Element";
import RegisterDirective from "@/utils/directive";
import RegisterComponent from "@/components";
import RegisterGlobal from "@/utils/global";
import "virtual:svg-icons-register";

const app = createApp(App);

app.mixin(GlobalMixin);
app.use(router);
app.use(store, key);
RegisterDirective(app);
RegisterComponent(app);
RegisterGlobal(app);

// ElementPlus
RegisterElement(app);
// AntDesign
app.use(Antd);

app.mount("#app");
