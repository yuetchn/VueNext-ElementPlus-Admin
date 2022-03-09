/*
 * @ModuleName: Main
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-09 13:19:04
 */
import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn"
import App from "@/App.vue";
import "@/utils/permission";
import router from "@/router";

// mock server
import "@/mock"

import { GlobalMixin } from "@/mixins";
import { store, key } from "@/store";
import RegisterDirective from "@/directive";
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
app.use(ElementPlus, { size: "mini", locale });
// AntDesign
app.use(Antd);

app.mount("#app");
