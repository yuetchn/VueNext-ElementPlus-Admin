<!--
 * @ModuleName: Icons
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 11:23:46
-->
<template>
  <div>
    <a-alert message="使用说明：" type="info">
      <template #description>
        <p>
          使用全局组件: g-svg-icon<br />
          属性:<br />
          Size: 大小 <br />
          Name: Icon文件名字<br />
          Color: Icon 颜色
        </p>
      </template>
    </a-alert>
    <br />
    <div class="m_icons">
      <div v-for="item of icons" :key="item" class="m_icons_item">
        <g-svg-icon :name="item" :size="23"></g-svg-icon>
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const icons = import.meta.glob("/src/assets/icons/**/*.svg");
    const state = reactive({
      icons: Object.keys(icons).map((f) => f.replace(/^.*\//, "").replace(/.svg/, "")),
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
}
</style>
