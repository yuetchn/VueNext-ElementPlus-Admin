<!--
 * @ModuleName: MD
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-05 22:16:03
-->
<template>
  <div>
    <el-card>
      <template #header>使用</template>
      <g-mark-down v-model="md"></g-mark-down>
    </el-card>

    <el-card style="margin-top:15px">
      <template #header>属性</template>
      <g-table style="height:300px" :columns="help.PropertyColumns" :data="data"></g-table>
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
