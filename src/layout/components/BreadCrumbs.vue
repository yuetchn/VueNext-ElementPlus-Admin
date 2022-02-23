<!--
 * @ModuleName: BreadCrumbs
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-21 11:41:17
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

    return {
      // refs
      ...toRefs(state),
    };
  },
});
</script>
