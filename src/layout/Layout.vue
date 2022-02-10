<!--
 * @ModuleName: Layout
 * @Author: 乐涛
 * @LastEditTime: 2022-02-10 15:30:14
-->
<template>
  <div class="m_layout">
    <div class="m_left_silder">
      <SilderBar></SilderBar>
    </div>
    <div class="m_right_content" :style="mRightContent">
      <NavBar></NavBar>
      <ViewTag></ViewTag>
      <Main></Main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch, toRefs } from "vue";
import { useStore } from "@/store";
import Main from "./components/Main.vue";
import SilderBar from "./components/SilderBar.vue";
import NavBar from "./components/NavBar.vue";
import ViewTag from "./components/ViewTag.vue";

export default defineComponent({
  name: "Layout",
  components: { Main, SilderBar, NavBar, ViewTag },
  setup() {
    const store = useStore();
    const state = reactive({
      mRightContent: {},
    });
    watch(
      () => store.state.AppModule.isShrink,
      (n) => {
        if (n) {
          state.mRightContent = {
            marginLeft: "80px",
          };
        } else {
          state.mRightContent = {};
        }
      },
      { immediate: true },
    );

    return {
      // refs
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.m_layout {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
}
.m_left_silder {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1000;
}

.m_right_content {
  overflow: hidden;
  margin-left: 220px;
  transition: margin-left 0.3s;
}
</style>
