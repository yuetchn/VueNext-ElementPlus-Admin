<!--
 * @ModuleName: ExportExcel
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 15:45:07
-->
<template>
  <div>
    <a-alert message="使用说明：" type="info">
      <template #description>
        <p>
          util函数方式导出: ExportExcel(header,data,fileName)<br />
          Header: 标题数组<br />
          Data: 数据数组<br />
          FileName: Excel文件名<br />
        </p>
      </template>
    </a-alert>
    <div style="display: flex; padding: 20px">
      <el-input v-model="excelFileName" style="width: 220px; margin-right: 15px"></el-input>
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ExportJsonExcel } from "@/utils/excel";

const excelFileName = ref("excelName");
const exportExcel = () => {
  ExportJsonExcel(["测试列1", "测试列2"], [{ 测试列1: "数据1", 测试列2: "数据2" }], excelFileName.value);
};
</script>
