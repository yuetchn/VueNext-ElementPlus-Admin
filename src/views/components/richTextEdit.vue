<!--
 * @ModuleName: richTextEdit
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 15:24:37
-->
<template>
  <div>
    <el-card>
      <template #header> 使用富文本 </template>
      <div>
        <g-editor v-model="text"></g-editor>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header>属性说明</template>
      <g-table :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import help from "./index";

const data = ref([
  {
    name: "v-model",
    desc: "内容绑定",
    type: "any",
    default: "",
  },
  {
    name: "tag-name",
    desc: "生成指定tag标签",
    type: "string",
    default: "div",
  },
  {
    name: "width",
    desc: "编辑器宽度",
    type: "number",
    default: "0",
  },
  {
    name: "height",
    desc: "编辑器高度",
    type: "number",
    default: "300",
  },
]);
const text = ref("<p>测试文档编辑</p>");
</script>
