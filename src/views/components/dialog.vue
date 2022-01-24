<!--
 * @ModuleName: Dialog
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 14:30:50
-->
<template>
  <div>
    <a-alert message="使用说明：" type="info">
      <template #description>
        <p>
          使用全局组件: g-dialog<br />
          属性:<br />
          title: 对话框标题<br />
          其他属性可查看组件源码。
        </p>
      </template>
    </a-alert>
    <br />
    <el-button type="primary" @click="showDialog = true">show dialog</el-button>
    <g-dialog v-model="showDialog" title="dialog title">
      test dialog demo
      <template #footer>
        <el-button>Close</el-button>
        <el-button type="primary">Submit</el-button>
      </template>
    </g-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const showDialog = ref(false);
</script>
