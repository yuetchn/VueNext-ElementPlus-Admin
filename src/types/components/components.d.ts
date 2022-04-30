/*
 * @ModuleName: Global Components Types
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-26 11:55:48
 */

import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog/Dialog.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Page from "@/components/Page/Page.vue";
import Chart from "@/components/Charts/Chart";
import MarkDown from "@/components/MarkDown/MarkDown"
import QrCode from "@/components/QrCode/QrCode"
import Link from "@/components/Link/Link";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": InstanceType<typeof Table>;
    "g-dialog": InstanceType<typeof Dialog>;
    "g-svg-icon": InstanceType<typeof SvgIcon>;
    "g-page": InstanceType<typeof Page>;
    "g-chart": InstanceType<typeof Chart>;
    "g-mark-dowm": InstanceType<typeof MarkDown>;
    "g-qr-code": InstanceType<typeof QrCode>;
    "g-link":InstanceType<typeof Link>;
  }
}
