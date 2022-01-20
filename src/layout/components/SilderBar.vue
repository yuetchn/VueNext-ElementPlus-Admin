<!--
 * @ModuleName: SilderBar
 * @Author: 乐涛
 * @LastEditTime: 2022-01-20 11:02:46
-->
<template>
  <div class="m_silder_bar" :class="{ m_silder_bar_shrink: isShrink }">
    <div class="m_silderBar_title">{{ title }}</div>
    <a-menu v-model:selectedKeys="nowSelMenuKeys" v-model:openKeys="nowOpemMenuKeys" :inline-collapsed="isShrink" mode="inline">
      <a-sub-menu v-for="item of routes" :key="item.path">
        <template #icon>
          <g-svg-icon :name="item.meta?.icon"></g-svg-icon>
        </template>
        <template #title>{{ item.meta?.title || "Not Title" }}</template>
        <a-menu-item v-if="!item.children?.length" :key="item.path" @click="titleClick(item)">
          <template #icon>
            <g-svg-icon :name="item.meta?.icon"></g-svg-icon>
          </template>
          <span> {{ item.meta?.title || "Not Title" }}</span>
        </a-menu-item>
        <a-menu-item v-for="c of item.children" :key="`${item.path}/${c.path}`" @click="titleClick(c)">
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
import { RouteRecordRaw, useRouter, useRoute } from "vue-router";
import { routes } from "@/router";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      nowSelMenuKeys: <string[]>[],
      nowOpemMenuKeys: <string[]>[],
      title: import.meta.env.VITE_APP_TITLE,
      isShrink: computed(() => store.state.AppModule.isShrink),
      routes: routes.filter((f) => !f.meta?.hide),
    });

    state.nowSelMenuKeys = store.getters["AppModule/getNowRoutePath"];
    state.nowOpemMenuKeys = store.getters["AppModule/getNowRouteSpread"];
    const titleClick = (item: RouteRecordRaw) => {
      router.push(item.path);
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
  width: 180px;
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
