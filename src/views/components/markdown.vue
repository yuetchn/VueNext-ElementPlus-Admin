<!--
 * @ModuleName: MD
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-08 11:19:07
-->
<template>
  <div>
    <el-card>
      <template #header>使用</template>
      <g-mark-down v-model="md"></g-mark-down>
    </el-card>

    <el-card style="margin-top:15px">
      <template #header>属性</template>
      <g-table :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import md from "../../../README.md?raw";
import help from "./index"

const data = [{
  name: "v-model",
  desc: "MardDowm内容",
  type: "string",
}]

</script>
