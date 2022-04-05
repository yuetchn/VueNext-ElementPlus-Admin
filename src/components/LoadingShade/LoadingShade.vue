<!--
 * @ModuleName: 请求加载遮罩层
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-30 20:16:03
-->
<template>
  <teleport to="body">
    <div v-if="showLoadingShade" class="loading_shade"></div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const showLoadingShade = computed(() => store.state.AppModule.loadingShade);

    return {
      // ref
      showLoadingShade,
    };
  },
});
</script>
<style lang="scss" scoped>
.loading_shade {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.4);
  background: transparent;
  z-index: 800;
  cursor: not-allowed;
}
</style>
