<!--
 * @ModuleName: BreadCrumbs
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-15 15:34:10
-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item of paths" :key="item.path" :to="{ path: item.path }">
        <!-- {{ item.meta?.title || item.path }} -->
        {{ $t(item.name?.toString() || "") === item.name ? item.meta?.title || item.path : $t(item.name?.toString() || "") }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const root = computed(() => {
      let _r = router.getRoutes().find(f => f.path === "/")
      if (_r?.redirect) {
        _r = router.getRoutes().find(f => f.path === _r?.redirect)
      }
      return _r
    })
    const state = reactive({
      paths: computed(() => {
        const _r = [...route.matched]
        if (!_r.find(f => f.path === root.value?.path)) {
          _r.unshift(root.value as any)
        }
        return _r
      }),
    });

    return {
      // refs
      ...toRefs(state),
    };
  },
});
</script>