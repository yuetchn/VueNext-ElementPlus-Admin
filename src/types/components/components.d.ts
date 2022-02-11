/*
 * @ModuleName: Global Components Types
 * @Author: 乐涛
 * @LastEditTime: 2022-02-11 10:51:36
 */

import Table from "@/components/Table/Table";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    "g-table": typeof Table;
  }
}

export {}