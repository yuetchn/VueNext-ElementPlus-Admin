<!--
 * @ModuleName: Main
 * @Author: 乐涛
 * @LastEditTime: 2022-01-25 11:04:59
-->
<template>
  <div class="m_main">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.name" enter-active-class="enter_active">
        <keep-alive :include="[]" :exclude="[]" :max="cacheMax">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({});

    const cacheMax = computed((import.meta.env.VITE_ROUTER_CACHE_MAX, (v) => v));

    return {
      // refs
      ...toRefs(state),

      // computed
      cacheMax,
    };
  },
});
</script>
<style lang="scss" scoped>
.m_main {
  height: calc(100% - 45px);
  padding: 8px;
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
