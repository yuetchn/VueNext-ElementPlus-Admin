<!--
 * @ModuleName: richTextEdit
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-24 14:29:02
-->
<template>
  <div>
    <a-alert message="使用说明：" type="warning" show-icon>
      <template #description>
        <p>
          使用全局组件: g-editor<br />
          属性:<br />
          Width: 编辑器宽度<br />
          Height: 编辑器高度<br />
          其他定制可直接修改组件源码。
        </p>
      </template>
    </a-alert>
    <br />
    <h2>演示:</h2>
    <el-input v-model="text" style="margin-bottom:20px;" type="textarea"></el-input>
    
    <g-editor v-model="text"></g-editor>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const text = ref("<p>测试文档编辑</p>");
</script>
