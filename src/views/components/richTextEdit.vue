<!--
 * @ModuleName: richTextEdit
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-08 17:28:18
-->
<template>
  <div>
    <el-card>
      <template #header> 使用富文本 </template>
      <div style="height:300px">
        <el-input v-model="text" placeholder=""></el-input>
        <button @click="test">插入内容</button>
        <g-editor ref="editor" v-model="text"></g-editor>
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
    name: "id",
    desc: "Dom ID",
    type: "string",
    default: "editor",
  },
  {
    name: "v-model",
    desc: "内容绑定",
    type: "any",
    default: "",
  },
  {
    name: "width",
    desc: "编辑器宽度",
    type: "string | number",
    default: "",
  },
  {
    name: "height",
    desc: "编辑器高度",
    type: "string | number",
    default: "",
  },
  {
    name: "min-height",
    desc: "编辑器最小高度",
    type: "string | number",
    default: "300",
  },
]);
const text = ref("<p>测试文档编辑</p>");
const editor = ref()
const test = () => {
  editor.value.insertContent("测试")
}
</script>
