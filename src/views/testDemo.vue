<!--
 * @ModuleName: 
 * @Author: 乐涛
 * @LastEditTime: 2022-01-20 11:57:34
-->
<template>
  <div>
    <router-link to="/test/test2">跳转testDemo2</router-link>
    <button @click="test()">测试</button>
    {{ treeData }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import req from "@/utils/request";

export default defineComponent({
  name: "Test",
  setup() {
    const state = reactive({
      treeData: <any[]>[],
    });

    const test = async () => {
      const { data } = await req.Get("GetTreeMenu");
      if (data.code === 200) {
        state.treeData = data.data;
      }
    };

    return {
      // refs
      ...toRefs(state),

      // func
      test,
    };
  },
});
</script>
<style lang="scss" scoped></style>
