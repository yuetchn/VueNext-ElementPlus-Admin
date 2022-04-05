<!--
 * @ModuleName: QrCode
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-05 22:16:08
-->
<template>
  <div>
    <el-card>
      <template #header>示例：不同颜色</template>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="qr_code">
              <g-qr-code value="test" color="#5EA66A"></g-qr-code>
              <div class="name">绿色</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="qr_code">
              <g-qr-code value="test" color="#FFC700"></g-qr-code>
              <div class="name">黄色</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="qr_code">
              <g-qr-code value="test" color="#E81E02"></g-qr-code>
              <div class="name">红色</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="qr_code">
              <g-qr-code value="test"></g-qr-code>
              <div class="name">默认</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card style="margin-top:15px;">
      <template #header>示例：不同大小</template>
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="qr_code">
              <g-qr-code value="test" :width="200"></g-qr-code>
              <div class="name">200</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="qr_code">
              <g-qr-code value="test" :width="350"></g-qr-code>
              <div class="name">350</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card style="margin-top:15px;">
      <template #header>示例：动态生成</template>
      <div style="text-align:center;">
        <g-qr-code ref="qrCode" value="test" :width="200"></g-qr-code><br />
        <el-input v-model.trim="value" style="width:300px;margin-right:10px;" />
        <el-button type="primary" @click="reload()">重新生成二维码</el-button>
      </div>
    </el-card>

    <el-card style="margin-top:15px;">
      <template #header>属性</template>
      <g-table style="height:300px" :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>

    <el-card style="margin-top:15px;">
      <template #header>方法</template>
      <g-table style="height:300px" :columns="help.FuncColumns" :data="data2"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import help from "./index"

export default defineComponent({
  setup() {
    const qrCode = ref()
    const value = ref("你好帅啊~")

    const data = [{
      name: "value",
      desc: "内容",
      type: "string",
    },
    {
      name: "backgroundColor",
      desc: "背景色,值必须为RGBA(十六进制)格式",
      type: "string",
      default: "#ffffffff",
    },
    {
      name: "color",
      desc: "颜色,值必须为RGBA(十六进制)格式",
      type: "string",
      default: "#000000ff",
    },
    {
      name: "margin",
      desc: "边距",
      type: "number",
      default: "3",
    },
    {
      name: "width",
      desc: "宽度(高度)",
      type: "nunber",
      default: "150",
    },
    {
      name: "scale",
      desc: "比例因子",
      type: "nunber",
      default: "5",
    }]

    const data2 = [
      {
        name: "create",
        desc: "创建/重新生成二维码",
        type: "function(val){}",
        default: "",
      },
    ]

    const reload = () => qrCode.value.create(value.value)

    return {
      // ref
      qrCode,
      value,

      // func
      reload,

      data,
      data2,
      help,
    }
  },
})
</script>
<style lang="scss" scoped>
  .qr_code {
    text-align: center;

    .name {
      font-size: 15px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
    }
  }
</style>