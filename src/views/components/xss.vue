<!--
 * @ModuleName: xss
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 10:43:42
-->
<template>
  <div>
    <el-card>
      <template #header>xss攻击</template>
      <div style="color: rgba(0, 0, 0, 0.35)">
        XSS攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。
        <br />
        有效防御是解决问题的关键，一下示例基于插件：xss 实现。
        <el-link href="https://github.com/leizongmin/js-xss"></el-link>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header>使用</template>
      <div style="padding: 10px 0">
        <span style="display: block; color: rgba(0, 0, 0, 0.35); font-weight: bold; font-size: 15px">模板中使用：</span>
        <div>全局方法：$func.Xss('html')</div>
        <br />
        <span style="display: block; color: rgba(0, 0, 0, 0.35); font-weight: bold; font-size: 15px">script中使用：</span>
        <div>
          import xss from '@/utils/xss' <br />
          xss('html')
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header>示例</template>
      <div style="padding: 10px 0">
        <span style="display: block; color: rgba(0, 0, 0, 0.35); font-weight: bold; font-size: 15px">未使用xss防御情况：</span>
        <div v-html="val"></div>
        <br />
        <span style="display: block; color: rgba(0, 0, 0, 0.35); font-weight: bold; font-size: 15px">使用xss防御：</span>
        <div v-html="$func.Xss(val)"></div>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header>文档</template>
      <g-mark-down v-model="md"></g-mark-down>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import md from "./xss.md?raw";

const val = ref("<div onclick=\"alert('注入成功')\" style='width:100%;padding:10px 0;'>测试注入(你可以尝试点击我触发onclick事件)</div>");
</script>
<style lang="scss" scoped></style>
