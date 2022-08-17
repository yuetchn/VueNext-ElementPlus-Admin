<!--
 * @ModuleName: Locale
 * @Author: 乐涛
 * @LastEditTime: 2022-08-09 10:46:36
-->
<template>
  <div>
    <div style="padding: 15px 10px; margin-bottom: 15px; background-color: #ffffff">
      <el-alert type="success">
        <div style="display: flex">
          <div style="font-size: 14px; margin-right: 15px">项目基于 vue-i18n 插件实现的国际化</div>
          <el-link style="padding: 0; height: auto" type="primary">Vue-I18n：https://github.com/intlify/vue-i18n-next</el-link>
        </div>
      </el-alert>
    </div>
    <el-card>
      <template #header>切换语言</template>
      <div style="text-align: center">
        <el-radio-group v-model="now" @change="toggle">
          <el-radio v-for="item of typeList" :key="item.key" border :label="item.key">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="font-size: 16px; font-weight: bold; color: rgba(0, 0, 0, 0.25); margin-top: 20px">ElementPlus组件语言切换</div>
      <div style="padding:10px 0;">
        <el-color-picker />
        <span style="padding:0 10px;"></span>
        <el-date-picker type="date" placeholder="Pick a day"> </el-date-picker>
        <br />
        <br />
        <el-table border>
          <el-table-column label="ID"></el-table-column>
          <el-table-column label="ID"></el-table-column>
          <el-table-column label="ID"></el-table-column>
          <el-table-column label="ID"></el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>说明</template>

      <div style="line-height: 35px">
        <span style="font-size: 16px; color: rgba(0, 0, 0, 0.4)">1.使用</span><br />
        <div style="color: #333333">(1).Template 模板中使用全局挂载方法：$('key')</div>
        <div style="color: #333333; margin-bottom: 15px">
          (2).Script 中使用 useI18n 组合式API实现： <br />
          import { useI18n } from "@/locale" <br />
          const { t } = useI18n(); <br />
          // console.log(t("test"))
        </div>
        <div style="color: #333333; margin-bottom: 15px">
          (3).支持导航地址侦听动态切换语言： <br />
          http://localhost:85/#/components/richTextEdit?lang=zh-CN
        </div>
        <span style="font-size: 16px; color: rgba(0, 0, 0, 0.4)">2.切换语言方法（异步）：toggleLocaleAsync</span><br />
        <div style="color: #333333">通过调用 toggleLocaleAsync 方法实现动态切换,localeTypes 导出已安装的所有语言列表。</div>

        <span style="font-size: 16px; color: rgba(0, 0, 0, 0.4)">3.切换语言方法（导航栏地址切换）</span><br />
        <div style="color: #333333">通过导航地址附带参数 'lang' 动态切换语言</div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import i18n, { toggleLocaleAsync, localeTypes } from "@/locale";

const typeList = localeTypes;
const now = ref(i18n.global.locale);
const toggle = () => toggleLocaleAsync(now.value);

watch(
  () => i18n.global.locale,
  (v) => {
    now.value = v as any;
  },
);
</script>
