<!--
 * @ModuleName: Echart
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-05 22:15:19
-->
<template>
  <div>
    <el-card>
      <template #header> 基本使用 </template>
      <el-row>
        <el-col :span="12">
          <g-chart height="450px" :options="lineOptions"></g-chart>
        </el-col>
        <el-col :span="12">
          <g-chart height="450px" :options="pieOptions"></g-chart>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>属性</template>
      <g-table style="height:300px" :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>方法</template>
      <div>可通过 <b>ref</b> 获取EChart原生方法。</div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import help from "../index";

const lineOptions = {
  title: {
    text: "访问人数",
    left: "center",
    padding: 10,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
};
const pieOptions = {
  title: {
    left: "center",
    padding: 10,
    text: "来源",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "8%",
    left: "center",
  },
  series: [
    {
      name: "来源",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "网络" },
        { value: 735, name: "官网" },
        { value: 580, name: "朋友" },
        { value: 484, name: "链接" },
        { value: 300, name: "广告" },
      ],
    },
  ],
};
const data = [
  {
    name: "width",
    desc: "图表宽度",
    type: "string | number",
    default: "auto",
  },
  {
    name: "height",
    desc: "图表高度",
    type: "string | number",
    default: "如果未设置取父级容器高度",
  },
  {
    name: "options",
    desc: "图表Options",
    type: "object",
    default: "{}",
  },
];
</script>
