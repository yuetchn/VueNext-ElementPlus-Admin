<!--
 * @ModuleName: Locale
 * @Author: 乐涛
 * @LastEditTime: 2022-03-10 08:23:40
-->
<template>
  <div>
    <div style="padding:15px 10px;margin-bottom:15px;background-color:#FFFFFF;">
      <el-alert type="success">
        <div style="display:flex">
          <div style="font-size:14px;margin-right:15px;">
            项目基于 vue-i18n 插件实现的国际化
          </div>
          <el-link style="padding:0;height:auto;" type="primary">Vue-I18n：https://github.com/intlify/vue-i18n-next</el-link>
        </div>
      </el-alert>
    </div>
    <el-card>
      <template #header>切换语言</template>
      <div style="text-align:center;">
        <el-radio-group v-model="now" @change="toggle">
          <el-radio v-for="item of typeList" :key="item.key" border :label="item.key">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
    </el-card>

    <el-card style="margin-top:15px">
      <template #header>说明</template>

      <div style="line-height:35px;">
        <span style="font-size:16px;color:rgba(0,0,0,0.4);">1.使用</span><br />
        <div style="color:#333333;">Template 模板中使用全局挂载方法：$('key')</div>
        <div style="color:#333333;margin-bottom:15px;">Script 中手动导入方法 import { t } from '@/locale'</div>
        <span style="font-size:16px;color:rgba(0,0,0,0.4);">2.切换语言方法：toggleLocale</span><br />
        <div style="color:#333333;">通过调用 toggleLocale 方法实现动态切换,localeTypes 导出已安装的所有语言列表。</div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue"
import i18n, { toggleLocale, localeTypes } from "@/locale"

const typeList = localeTypes
const now = ref(i18n.global.locale)
const toggle = () => toggleLocale(now.value)
watch(() => i18n.global.locale, (v:string) => {
  now.value = v
})
</script>