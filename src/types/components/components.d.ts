/*
 * @ModuleName: Global Components Types
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 14:06:39
 */

import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog/Dialog.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Page from "@/components/Page/Page.vue";
import ChartLine from "@/components/Charts/ChartLine.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": typeof Table;
    "g-dialog": typeof Dialog;
    "g-svg-icon": typeof SvgIcon;
    "g-page": typeof Page;
    "g-chart-line": typeof ChartLine;
  }
}

export {};
