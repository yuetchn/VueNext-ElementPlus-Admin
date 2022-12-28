<!--
 * @ModuleName: Layout
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-12-28 17:01:03
-->
<template>
  <div class="layout">
    <div class="left_silder">
      <Silderbar></Silderbar>
    </div>
    <div class="right_content" :style="mRightContent">
      <Navbar></Navbar>
      <ViewTag></ViewTag>
      <BaseMain></BaseMain>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch, toRefs } from "vue";
import { useStore } from "@/store";
import BaseMain from "./components/Main.vue";
import Silderbar from "./components/Silderbar.vue";
import Navbar from "./components/Navbar.vue";
import ViewTag from "./components/ViewTag.vue";

export default defineComponent({
  name: "Layout",
  components: { BaseMain, Silderbar, Navbar, ViewTag },
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
.layout {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
}
.left_silder {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 998;
}

.right_content {
  overflow: hidden;
  margin-left: 220px;
  transition: margin-left 0.3s;
  height: 100%;
}
</style>
