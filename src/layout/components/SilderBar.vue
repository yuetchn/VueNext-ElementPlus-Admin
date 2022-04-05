<!--
 * @ModuleName: SilderBar
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-30 20:12:29
-->
<template>
  <div class="silder_bar" :class="{ silder_bar_shrink: isShrink }">
    <el-scrollbar>
      <a-menu v-model:selectedKeys="nowSelMenuKeys" v-model:openKeys="nowOpemMenuKeys" :inline-collapsed="isShrink" mode="inline">
        <Logo></Logo>
        <template v-for="item of routes" :key="item.path">
          <a-menu-item v-if="item.children?.length === 1" :key="`${item.path}/${item.children && item.children[0].path}`" @click="titleClick(`${item.path}/${item.children && item.children[0].path}`, item.children && item.children[0])">
            <template #icon>
              <g-svg-icon :name="item.children && item.children[0].meta?.icon"></g-svg-icon>
            </template>
            <!-- <span> {{ (item.children && item.children[0].meta?.title) || "Not Title" }}</span> -->
            <span> {{ titleLocale((item.children && item.children[0].name?.toString()) || "") === (item.children && item.children[0].name) ? item.children && item.children[0].meta?.title : titleLocale((item.children && item.children[0].name?.toString()) || "") }}</span>
          </a-menu-item>
          <a-sub-menu v-else :key="item.path">
            <template #icon>
              <g-svg-icon :name="item.meta?.icon"></g-svg-icon>
            </template>
            <!-- item.meta?.title -->
            <template #title>{{ titleLocale(item.name?.toString() || "") === item.name ? item.meta?.title : titleLocale(item.name?.toString() || "") }}</template>
            <template v-for="c of item.children" :key="`${item.path}/${c.path}`">
              <a-menu-item v-if="!c.children?.length" :key="`${item.path}/${c.path}`" @click="titleClick(`${item.path}/${c.path}`, c)">
                <template #icon>
                  <g-svg-icon :name="c.meta?.icon"></g-svg-icon>
                </template>
                <!-- <span> {{ c.meta?.title || "Not Title" }}</span> -->
                <span> {{ titleLocale(c.name?.toString() || "") === c.name ? c.meta?.title : titleLocale(c.name?.toString() || "") }}</span>
              </a-menu-item>
              <SilderBarItem v-else :router="c" :parent-router="item.path" @title-click="titleClick"></SilderBarItem>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </el-scrollbar>
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
import { t } from "@/locale";

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
      routes: computed(() => [...routes, ...store.state.UserModule.menus].filter((f) => !f.meta?.hide)),
      clientWidth: computed(() => store.state.AppModule.clientWidth),
    });

    state.nowSelMenuKeys = store.getters["AppModule/getNowRoutePath"];
    state.nowOpemMenuKeys = store.getters["AppModule/getNowRouteSpread"];
    const titleClick = (path: string, route: RouteRecordRaw | undefined) => {
      if (route?.meta?.link) {
        window.open(route.meta.link);
        return;
      }
      router.push(path);
    };
    const titleLocale = (value: string) => t(value);

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
      (v: number, o: number) => {
        if (v < 1000 && v < o) {
          store.dispatch("AppModule/set_shrink", true);
        }
      },
    );
    return {
      // refs
      ...toRefs(state),

      // func
      titleClick,
      titleLocale,
    };
  },
});
</script>
<style lang="scss" scoped>
.silder_bar {
  width: 220px;
  height: 100%;
  transition: all 0.3s;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.08);
  background-color: $g-silderBar-background-color;
  border-right:1px solid rgba(0, 0, 0, 0.1);
}

.silder_bar_shrink {
  width: 80px;
}

.m_silderBar_title {
  height: 45px;
  background-color: $g-silderBar-background-color;
  color: #fff;
  line-height: 45px;
  text-align: center;
  overflow: hidden;
}

.ant-menu {
  background-color: $g-silderBar-background-color;
  color: $g-silderBar-color;
  height: 100%;
  // overflow: hidden;
  // overflow-y: auto;
}

::v-deep(.ant-menu-sub.ant-menu-inline) {
  background-color: $g-silderBar-selected-background-color;
  color: $g-silderBar-color;
}

::v-deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
  background-color: $g-silderBar-selected-background-color;
}

::v-deep(.ant-menu-sub.ant-menu-inline){
  background-color:$g-silderBar-sub-background-color;
}

::v-deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected){
  background-color:$g-silderBar-selected-background-color
}

.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 1px solid $g-silderBar-background-color;
}
</style>
