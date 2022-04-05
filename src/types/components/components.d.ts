/*
 * @ModuleName: Global Components Types
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-26 22:05:29
 */

import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog/Dialog.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Page from "@/components/Page/Page.vue";
import Chart from "@/components/Charts/Chart";
import MarkDown from "./MarkDown/MarkDown"
import QrCode from "./QrCode/QrCode"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": typeof Table;
    "g-dialog": typeof Dialog;
    "g-svg-icon": typeof SvgIcon;
    "g-page": typeof Page;
    "g-chart": typeof Chart;
    "g-mark-dowm": typeof MarkDown;
    "g-qr-code": typeof QrCode;
  }
}

export {};