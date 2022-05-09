<!--
 * @ModuleName: richTextEdit
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 12:09:38
-->
<template>
  <div>
    <el-card>
      <template #header> 使用富文本 </template>
      <div>
        <el-form label-position="top">
          <el-form-item label="插入内容">
            <el-row :gutter="15" style="width:100%">
              <el-col :span="22">
                <el-input v-model="appendText" placeholder="请输入要插入的内容"></el-input>
              </el-col>
              <el-col :span="2">
                <el-button style="width:100%" type="primary" @click="editor.insertContent(appendText)">插入内容</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <g-editor ref="editor" v-model="text" height="800px"></g-editor>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header>属性说明</template>
      <g-table style="height:300px" :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header>方法说明</template>
      <g-table style="height:300px" :columns="help.FuncColumns" :data="data1"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import help from "./index";

const data = ref([{
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
const data1 = [{
  name: "copyContent",
  desc: "复制选中内容",
  type: "function",
  default: "",
},
{
  name: "insertContent",
  desc: "插入内容",
  type: "function",
  default: "",
},
{
  name: "cursorGoEnd",
  desc: "光标移动到最后",
  type: "function",
},
]
const text = ref("<p>测试文档编辑</p>");
const appendText = ref()
const editor = ref()
</script>