<!--
 * @ModuleName: Layout
 * @Author: 乐涛
 * @LastEditTime: 2022-01-26 09:31:42
-->
<template>
  <div class="m_layout">
    <div class="m_left_silder">
      <SilderBar></SilderBar>
    </div>
    <div class="m_right_content">
      <NavBar></NavBar>
      <ViewTag></ViewTag>
      <Main></Main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Main from "./components/Main.vue";
import SilderBar from "./components/SilderBar.vue";
import NavBar from "./components/NavBar.vue";
import ViewTag from "./components/ViewTag.vue";

export default defineComponent({
  name: "Layout",
  components: { Main, SilderBar, NavBar, ViewTag },
});
</script>
<style lang="scss" scoped>
.m_layout {
  display: flex;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
}
.m_left_silder {
  height: 100%;
  flex: 0 0 auto;
}

.m_right_content {
  flex: 1;
  overflow: hidden;
}
</style>
