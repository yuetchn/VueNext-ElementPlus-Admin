/*
 * @ModuleName: Global Components Types
 * @Author: 乐涛
 * @LastEditTime: 2022-02-14 10:15:00
 */

import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog/Dialog.vue"
import SvgIcon from "@/components/SvgIcon/SvgIcon"
import Page from "@/components/Page/Page.vue"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": typeof Table;
    "g-dialog": typeof Dialog;
    "g-svg-icon": typeof SvgIcon;
    "g-page": typeof Page;
  }
}

export {}