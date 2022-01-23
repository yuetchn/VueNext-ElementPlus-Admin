<!--
 * @ModuleName: SilderBar
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 14:41:39
-->
<template>
  <div class="m_silder_bar" :class="{ m_silder_bar_shrink: isShrink }">
    <Logo></Logo>
    <a-menu
      v-model:selectedKeys="nowSelMenuKeys"
      v-model:openKeys="nowOpemMenuKeys"
      :inline-collapsed="isShrink"
      mode="inline"
    >
      <a-sub-menu v-for="item of routes" :key="item.path">
        <template #icon>
          <g-svg-icon :name="item.meta?.icon"></g-svg-icon>
        </template>
        <template #title>{{ item.meta?.title || "Not Title" }}</template>
        <a-menu-item
          v-if="!item.children?.length"
          :key="item.path"
          @click="titleClick(item.path)"
        >
          <template #icon>
            <g-svg-icon :name="item.meta?.icon"></g-svg-icon>
          </template>
          <span> {{ item.meta?.title || "Not Title" }}</span>
        </a-menu-item>
        <a-menu-item
          v-for="c of item.children"
          :key="`${item.path}/${c.path}`"
          @click="titleClick(`${item.path}/${c.path}`)"
        >
          <template #icon>
            <g-svg-icon :name="c.meta?.icon"></g-svg-icon>
          </template>
          <span> {{ c.meta?.title || "Not Title" }}</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    <!-- <div>版本号</div> -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, watch, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router";
import { useStore } from "@/store";
import Logo from "./Logo.vue";

export default defineComponent({
  components: { Logo },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      nowSelMenuKeys: <string[]>[],
      nowOpemMenuKeys: <string[]>[],
      isShrink: computed(() => store.state.AppModule.isShrink),
      routes: routes.filter((f) => !f.meta?.hide),
      clientWidth: computed(() => store.state.AppModule.clientWidth),
    });

    state.nowSelMenuKeys = store.getters["AppModule/getNowRoutePath"];
    state.nowOpemMenuKeys = store.getters["AppModule/getNowRouteSpread"];
    const titleClick = (path:string) => {
      router.push(path);
    };

    watch(
      () => state.nowOpemMenuKeys,
      (m: string[]) => {
        store.dispatch("AppModule/setNowRouteSpread", m);
      },
    );

    watch(
      () => route.path,
      (path: string) => {
        store.dispatch("AppModule/setNowRoutePath", path);
        state.nowSelMenuKeys = [path];
      },

      { deep: true, immediate: true },
    );

    watch(
      () => state.clientWidth,
      (v: number) => {
        if (v < 1000) {
          store.dispatch("AppModule/set_shrink", true);
        } else {
          store.dispatch("AppModule/set_shrink", false);
        }
      },

      { immediate: true },
    );
    return {
      // refs
      ...toRefs(state),

      // func
      titleClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.m_silder_bar {
  width: 220px;
  height: 100%;
  transition: all 0.3s;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.08);
}

.m_silder_bar_shrink {
  width: 80px;
}

.m_silderBar_title {
  height: 45px;
  background: #333333;
  color: #fff;
  line-height: 45px;
  text-align: center;
  overflow: hidden;
}
</style>
