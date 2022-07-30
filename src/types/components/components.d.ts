/*
 * @ModuleName: Global Components Types
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 13:44:40
 */

import Table from "@/components/Table";
import Dialog from "@/components/Dialog/Dialog.vue";
import SvgIcon from "@/components/SvgIcon";
import Page from "@/components/Page/Page.vue";
import Chart from "@/components/Charts";
import MarkDown from "@/components/MarkDown"
import QrCode from "@/components/QrCode"
import Link from "@/components/Link";
import IconSelect from "@/components/IconSelect"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": InstanceType<typeof Table>;
    "g-dialog": InstanceType<typeof Dialog>;
    "g-svg-icon": InstanceType<typeof SvgIcon>;
    "g-page": InstanceType<typeof Page>;
    "g-chart": InstanceType<typeof Chart>;
    "g-mark-dowm": InstanceType<typeof MarkDown>;
    "g-qr-code": InstanceType<typeof QrCode>;
    "g-link": InstanceType<typeof Link>;
    "g-icon-select": InstanceType<typeof IconSelect>;
  }
}
