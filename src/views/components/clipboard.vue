<!--
 * @ModuleName: clipboard
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 09:28:57
-->
<template>
  <div>
    <a-alert message="使用说明：" type="info">
      <template #description>
        <p>
          两种方式调用: 指令 v-copy:data,v-copy:success,v-copy:error,函数 clipboardFunction(data)<br />
          v-copy:data - 传入要写入剪切板的数据<br />
          v-copy:success - 写入成功回调<br />
          v-copy:error - 写入失败回调<br />
          clipboardFunction(data): 函数调用，返回Promise
        </p>
      </template>
    </a-alert>
    <br />
    <h2>指令方式</h2>
    <el-input v-model="text" style="width: 200px; margin-right: 10px"></el-input>
    <el-button v-copy:data="text" v-copy:success="copySuccess" v-copy:error="copyError" type="primary">指令调用v-copy</el-button>

    <br />
    <h2>函数方式</h2>
    <el-input v-model="text" style="width: 200px; margin-right: 10px"></el-input>
    <el-button type="primary" @click="copy">函数调用clipboardFunc</el-button>
  </div>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { ref } from "vue";
import { clipboardFunc } from "@/utils/func";

const text = ref("测试Copy");

const copySuccess = () => {
  message.success("copy成功");
};

const copyError = () => {
  message.error("copy失败");
};

const copy = () => {
  clipboardFunc(text.value)
  .then(() => copySuccess())
  .catch(() => message.success("copy成功"));
};
</script>
