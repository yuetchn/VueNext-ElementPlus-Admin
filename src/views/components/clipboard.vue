<!--
 * @ModuleName: clipboard
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 11:30:53
-->
<template>
  <div>
    <el-card>
      <template #header> 说明 </template>
      <div>剪切板提供 [Vue指令]\[函数调用] 两种方式以便使用。</div>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>指令调用[v-copy]</template>
      <el-input v-model="text" style="width: 200px; margin-right: 10px"></el-input>
      <el-button v-copy:data="text" v-copy:success="copySuccess" v-copy:error="copyError" type="primary">指令调用v-copy</el-button>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>函数调用[ClipboardFunc]</template>
      <el-input v-model="text" style="width: 200px; margin-right: 10px"></el-input>
      <el-button type="primary" @click="copy">函数调用ClipboardFunc</el-button>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>属性</template>
      <g-table style="height:300px" :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>方法</template>
      <g-table style="height:300px" :columns="help.FuncColumns" :data="data1"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { ref } from "vue";
import { ClipboardFunc } from "@/utils/func";
import help from "./index";

const text = ref("测试Copy");

const copySuccess = () => {
  message.success("copy成功");
};

const copyError = () => {
  message.error("copy失败");
};

const copy = () => {
  ClipboardFunc(text.value)
  .then(() => copySuccess())
  .catch(() => copyError());
};

const data = ref([
  {
    name: "v-copy:data",
    desc: "传入要复制的数据",
    type: "any",
  },
  {
    name: "v-copy:success",
    desc: "调用成功回调",
    type: "function",
  },
  {
    name: "v-copy:error",
    desc: "调用失败回调",
    type: "function",
  },
]);

const data1 = ref([
  {
    name: "ClipboardFunc(data)",
    desc: "函数调用,返回<Promise>",
  },
]);
</script>
