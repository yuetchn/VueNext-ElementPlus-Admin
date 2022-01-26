<!--
 * @ModuleName: Main
 * @Author: 乐涛
 * @LastEditTime: 2022-01-26 14:59:00
-->
<template>
  <section class="m_main">
    <div class="m_main_content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.name" enter-active-class="enter_active">
          <keep-alive :include="[]" :exclude="[]" :max="cacheMax">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </section>
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
  height: calc(100% - 45px - 40px);
  // padding: 8px;
  background:#FFF;
  overflow:hidden;
}

.m_main_content{
  padding:5px;
  background:#FFF;
  // border-radius:4px;
  box-shadow:0 0 8px 2px rgba(0,0,0,0.05);
  height:100%;
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
