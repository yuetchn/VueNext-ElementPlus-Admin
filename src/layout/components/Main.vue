<!--
 * @ModuleName: Main
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-01 09:45:41
-->
<template>
  <section class="m_main">
    <div class="m_main_content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.name" enter-active-class="enter_active">
          <keep-alive :include="cacheNames" :exclude="[]" :max="cacheMax">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const state = reactive({});
    const store = useStore();
    const cacheMax = computed((import.meta.env.VITE_ROUTER_CACHE_MAX, (v) => v));
    const cacheNames = computed(() => store.getters["ViewTagModule/getCacheNames"]);
    return {
      // refs
      ...toRefs(state),

      // computed
      cacheMax,
      cacheNames,
    };
  },
});
</script>
<style lang="scss" scoped>
.m_main {
  height: calc(100% - 45px - 35px);
  background-color: $g-main-background-color;
  color: $text-color-primary;
  overflow: hidden;
}

.m_main_content {
  padding: 15px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.05);
  height: 100%;
  overflow: auto;
}
.enter_active {
  animation: enter_active 1s ease;
}

@keyframes enter_active {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
