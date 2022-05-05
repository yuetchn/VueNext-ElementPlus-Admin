<!--
 * @ModuleName: 请求加载遮罩层
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-05 12:52:13
-->
<template>
  <teleport to="body">
    <div v-if="showLoadingShade" class="g_loading_shade"></div>
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