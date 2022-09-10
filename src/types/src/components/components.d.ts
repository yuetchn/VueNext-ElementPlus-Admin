/*
 * @ModuleName: Global Components Types
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-10 16:31:10
 */

import Table from "@/components/Table/index";
import Dialog from "@/components/Dialog/Dialog.vue";
import SvgIcon from "@/components/SvgIcon";
import Page from "@/components/Page/Page.vue";
import Chart from "@/components/Charts";
import MarkDown from "@/components/MarkDown";
import QrCode from "@/components/QrCode";
import Link from "@/components/Link";
import IconSelect from "@/components/IconSelect";
import Editor from "@/components/Editor/Editor.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": typeof Table;
    "g-dialog": typeof Dialog;
    "g-svg-icon": typeof SvgIcon;
    "g-page": typeof Page;
    "g-chart": typeof Chart;
    "g-mark-dowm": typeof MarkDown;
    "g-qr-code": typeof QrCode;
    "g-link": typeof Link;
    "g-editor": typeof Editor;
    "g-icon-select": typeof IconSelect;
  }
}
