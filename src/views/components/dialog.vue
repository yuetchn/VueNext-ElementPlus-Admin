<!--
 * @ModuleName: Dialog
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 14:40:22
-->
<template>
  <div>
    <el-button type="primary" @click="showDialog=true">show dialog</el-button>
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
import { ref } from "vue"

const showDialog = ref(false)
</script>