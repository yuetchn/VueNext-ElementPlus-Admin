<!--
 * @ModuleName: Dialog
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 15:38:39
-->
<template>
  <div>
    <el-card>
      <template #header>示例(普通弹窗)</template>
      <el-button type="primary" @click="showDialog = true">show dialog</el-button>
      <g-dialog v-model="showDialog" title="dialog title">
        test dialog demo
        <template #footer>
          <el-button>Close</el-button>
          <el-button type="primary">Submit</el-button>
        </template>
      </g-dialog>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>示例(全屏弹窗)</template>
      <el-button type="primary" @click="showDialog2 = true">全屏弹窗</el-button>
      <g-dialog v-model="showDialog2" :is-full="true" title="dialog title">
        test dialog demo
        <template #footer>
          <el-button>Close</el-button>
          <el-button type="primary">Submit</el-button>
        </template>
      </g-dialog>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>弹窗属性</template>
      <g-table :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>弹窗方法</template>
      <g-table :columns="help.FuncColumns" :data="data2"></g-table>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>弹窗插槽</template>
      <g-table :columns="help.SlotColumns" :data="data3"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import help from "./index";

const showDialog = ref(false);
const showDialog2 = ref(false);
const data = ref([
  {
    name: "v-model",
    desc: "显示/隐藏属性绑定",
    type: "boolean",
    default: "false",
    options: "true",
  },
  {
    name: "title",
    desc: "弹窗标题",
    type: "string",
    default: "",
    options: "",
  },
  {
    name: "shade",
    desc: "遮罩层是否显示",
    type: "boolean",
    default: "true",
    options: "false",
  },
  {
    name: "top",
    desc: "距离顶部距离",
    type: "string",
    default: "15vh",
    options: "",
  },
  {
    name: "width",
    desc: "弹窗宽度",
    type: "string",
    default: "500px",
    options: "",
  },
  {
    name: "height",
    desc: "弹窗高度",
    type: "string",
    default: "auto",
    options: "",
  },
  {
    name: "is-full",
    desc: "是否全屏",
    type: "boolean",
    default: "false",
    options: "true",
  },
  {
    name: "align",
    desc: "底部对齐方式",
    type: "string",
    default: "center",
    options: "left | center | right",
  },
]);
const data2 = ref([
  {
    name: "open",
    desc: "弹窗显示",
    type: "function",
  },
  {
    name: "close",
    desc: "弹窗关闭",
    type: "function",
  },
]);
const data3 = ref([
  {
    name: "default",
    desc: "默认插槽",
  },
  {
    name: "title",
    desc: "弹窗标题自定义插槽",
  },
  {
    name: "footer",
    desc: "弹窗底部自定义插槽",
  },
]);
</script>
