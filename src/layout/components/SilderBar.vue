<!--
 * @ModuleName: SilderBar
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 11:42:04
-->
<template>
  <div class="m_silder_bar" :class="{ m_silder_bar_shrink: isShrink }">
    <a-menu v-model:selectedKeys="nowSelMenuKeys" v-model:openKeys="nowOpemMenuKeys" theme="dark" :inline-collapsed="isShrink" mode="inline">
      <Logo></Logo>
      <a-sub-menu v-for="item of routes" :key="item.path">
        <template #icon>
          <g-svg-icon :name="item.meta?.icon"></g-svg-icon>
        </template>
        <template #title>{{ item.meta?.title || "Not Title" }}</template>
        <span v-for="c of item.children" :key="`${item.path}/${c.path}`">
          <a-menu-item v-if="!c.children?.length" :key="`${item.path}/${c.path}`" @click="titleClick(`${item.path}/${c.path}`, c)">
            <template #icon>
              <g-svg-icon :name="c.meta?.icon"></g-svg-icon>
            </template>
            <span> {{ c.meta?.title || "Not Title" }}</span>
          </a-menu-item>
          <SilderBarItem v-else :router="c" :parent-router="item.path" @title-click="titleClick"></SilderBarItem>
        </span>
      </a-sub-menu>
    </a-menu>
    <!-- <div>版本号</div> -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, watch, reactive, toRefs } from "vue";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
import SilderBarItem from "./SiderBarItem.vue";
import { routes } from "@/router";
import { useStore } from "@/store";
import Logo from "./Logo.vue";

export default defineComponent({
  components: { Logo, SilderBarItem },
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
    const titleClick = (path: string, route: RouteRecordRaw) => {
      if (route.meta?.link) {
        window.open(route.meta.link);
        return;
      }
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
  background-color: $g_silderBar_background_color;
  color: #fff;
  line-height: 45px;
  text-align: center;
  overflow: hidden;
}

.ant-menu {
  background-color: $g_silderBar_background_color;
  color: $g_silderBar_color;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

::v-deep(.ant-menu-sub.ant-menu-inline) {
  background-color: $g_silderBar_selected_background_color;
  color: $g_silderBar_color;
}

::v-deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
  background-color: $g_silderBar_selected_background_color;
}

.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 1px solid $g_silderBar_background_color;
}
</style>
