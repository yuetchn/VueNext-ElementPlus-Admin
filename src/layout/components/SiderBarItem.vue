<!--
 * @ModuleName: SilderBarItem
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 11:42:03
-->
<template>
  <a-sub-menu>
    <template #icon>
      <g-svg-icon :name="router.meta?.icon"></g-svg-icon>
    </template>
    <template #title>{{ router.meta?.title || "Not Title" }}</template>
    <a-menu-item v-for="c of router.children" :key="`${parentRouter}/${router.path}/${c.path}`" @click="$emit('titleClick', `${parentRouter}/${router.path}/${c.path}`,c)">
      <template #icon>
        <g-svg-icon :name="c.meta?.icon"></g-svg-icon>
      </template>
      <span> {{ c.meta?.title || "Not Title" }}</span>
      <slot name="default"></slot>
    </a-menu-item>
  </a-sub-menu>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";

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
});
</script>
