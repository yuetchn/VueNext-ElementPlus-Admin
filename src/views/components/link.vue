<!--
 * @ModuleName: 链接
 * @Author: 乐涛
 * @LastEditTime: 2022-04-21 07:46:57
-->
<template>
  <div>
    <el-card>
      <template #header>示例</template>
      <el-row>
        <el-col :span="4">
          <g-link>default</g-link>
        </el-col>
        <el-col :span="4">
          <g-link type="primary">primary</g-link>
        </el-col>
        <el-col :span="4">
          <g-link type="info">info</g-link>
        </el-col>
        <el-col :span="4">
          <g-link type="danger">danger</g-link>
        </el-col>
        <el-col :span="4">
          <g-link type="warning">warning</g-link>
        </el-col>
        <el-col :span="4">
          <g-link type="primary" icon="home">带图标</g-link>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:15px;">
      <template #header>属性</template>
      <g-table height="350px" :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import help from "./index";

const data = [
  {
    name: "type",
    desc: "类型",
    default: "default",
    type: "string",
    options: "primary/success/warning/danger/info",
  },
  {
    name: "underline",
    desc: "是否显示下划线",
    default: "true",
    type: "boolean",
    options: "false",
  },
  {
    name: "align",
    desc: "图标显示位置",
    default: "left",
    type: "string",
    options: "right",
  },
  {
    name: "disabled",
    desc: "是否禁用",
    default: "false",
    type: "boolean",
    options: "true",
  },
  {
    name: "href",
    desc: "跳转地址",
    default: "",
    type: "string",
    options: "",
  },
  {
    name: "icon",
    desc: "图标,与 SvgIcon 组件的name属性一致",
    default: "",
    type: "string",
    options: "",
  },
]
</script>