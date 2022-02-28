<!--
 * @ModuleName: Icons
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 16:11:02
-->
<template>
  <div>
    <el-card>
      <template #header>说明</template>
      <div>
        组件名: g-svg-icon <br />
        新增图标：只需要将Svg图片放入/assets/icons下即可<br />
        规则: icon-[dir]-[name]
      </div>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>使用</template>
      <div class="m_icons">
        <div v-for="item of icons" :key="item" class="m_icons_item">
          <g-svg-icon :name="item" :size="23"></g-svg-icon>
          <div>{{ item }}</div>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>属性</template>
      <g-table :columns="help.PropertyColumns" :data="data"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import help from "./index";

export default defineComponent({
  setup() {
    const icons = import.meta.glob("/src/assets/icons/**/*.svg");
    const state = reactive({
      help,
      icons: Object.keys(icons).map((f) => f.replace(/^.*\//, "").replace(/.svg/, "")),
      data: [
        {
          name: "name",
          desc: "图标名称,采用 [dir]-[name]方式，如果没有子文件夹，直接写name即可",
          type: "string",
          default: "",
        },
        {
          name: "size",
          desc: "svg大小",
          type: "number | string",
          default: "16",
        },
        {
          name: "color",
          desc: "颜色",
          type: "string",
          default: "",
        },
      ],
    });

    return {
      // refs
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.m_icons {
  display: flex;
  flex-wrap: wrap;
}

.m_icons_item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100px;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
