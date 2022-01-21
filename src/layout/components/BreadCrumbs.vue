<!--
 * @ModuleName: 面包屑
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 10:07:39
-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item of paths" :key="item.path" :to="{ path: item.path }">{{ item.meta?.title || item.path }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, reactive } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const state = reactive({
      paths: computed(() => route.matched),
    });
    console.log(route.matched);

    return {
      // refs
      ...toRefs(state),
    };
  },
});
</script>
