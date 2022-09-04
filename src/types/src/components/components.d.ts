/*
 * @ModuleName: Global Components Types
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:26:46
 */

import Table from "@/components/Table";
import Dialog from "@/components/Dialog/Dialog.vue";
import SvgIcon from "@/components/SvgIcon";
import Page from "@/components/Page/Page.vue";
import Chart from "@/components/Charts";
import MarkDown from "@/components/MarkDown";
import QrCode from "@/components/QrCode";
import Link from "@/components/Link";
import IconSelect from "@/components/IconSelect";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": InstanceType<typeof Table>["g-table"];
    "g-dialog": InstanceType<typeof Dialog>["g-dialog"];
    "g-svg-icon": InstanceType<typeof SvgIcon>["g-svg-icon"];
    "g-page": InstanceType<typeof Page>["g-page"];
    "g-chart": InstanceType<typeof Chart>["g-chart"];
    "g-mark-dowm": InstanceType<typeof MarkDown>["g-mark-down"];
    "g-qr-code": InstanceType<typeof QrCode>["g-qr-code"];
    "g-link": InstanceType<typeof Link>["g-link"];
    "g-icon-select": InstanceType<typeof IconSelect>["g-icon-select"];
  }
}

export { };
