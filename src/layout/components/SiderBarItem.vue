<!--
 * @ModuleName: SilderBarItem
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-19 11:59:23
-->
<template>
  <a-sub-menu>
    <template #icon>
      <g-svg-icon :name="router.meta?.icon"></g-svg-icon>
    </template>
    <!-- router.meta?.title -->
    <template #title>{{ titleLocale(router.name?.toString() || "") === router.name ? router.meta?.title : titleLocale(router.name?.toString() || "") }}</template>
    <a-menu-item v-for="c of router.children?.filter((f) => !f.meta?.hide)" :key="`${parentRouter}/${router.path}/${c.path}`" @click="$emit('titleClick', `${parentRouter}/${router.path}/${c.path}`, c)">
      <template #icon>
        <g-svg-icon :name="c.meta?.icon"></g-svg-icon>
      </template>
      <span> {{ titleLocale(c.name?.toString() || "") === c.name ? c.meta?.title : titleLocale(c.name?.toString() || "") }}</span>
      <slot name="default"></slot>
    </a-menu-item>
  </a-sub-menu>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { t } from "@/locale";

export default defineComponent({
  props: {
    router: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({
        children: [],
      }),
    },
    parentRouter: {
      type: String,
      default: "/",
    },
  },
  emits: ["titleClick"],
  setup() {
    const titleLocale = (value: string) => t(value);

    return {
      // func
      titleLocale,
    };
  },
});
</script>
