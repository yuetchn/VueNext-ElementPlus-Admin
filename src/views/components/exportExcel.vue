<!--
 * @ModuleName: ExportExcel
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-05 22:15:53
-->
<template>
  <div>
    <el-card>
      <template #header>导出Excel</template>
      <div>
        <el-input v-model="excelFileName" style="width: 220px; margin-right: 15px"></el-input>
        <el-button type="primary" @click="exportExcel">导出</el-button>
        <br /><br />
        <g-table :columns="columns" :data="data"></g-table>
      </div>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>函数</template>
      <g-table style="height:300px" :columns="help.FuncColumns" :data="data1"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ExportJsonExcel } from "@/utils/excel";
import help from "./index";

const excelFileName = ref("excelName");
const exportExcel = () => {
  ExportJsonExcel(["id", "name", "address"], data.value, excelFileName.value);
};

const columns = ref([
  {
    label: "ID",
    prop: "id",
    width: "60px",
  },
  {
    label: "Name",
    prop: "name",
  },
  {
    label: "Address",
    prop: "address",
  },
]);
const data = ref([
  {
    id: 1,
    name: "测试1",
    address: "上海",
  },
  {
    id: 2,
    name: "测试2",
    address: "上海",
  },
  {
    id: 3,
    name: "测试3",
    address: "上海",
  },
]);
const data1 = ref([
  {
    name: "ExportExcel",
    desc: "导出Excel(函数在Util包内)",
    type: "function",
    default: "{header:Array<string>,data:Array<Object>,fileName:string}",
  },
]);
</script>
