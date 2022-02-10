<!--
 * @ModuleName: Logo
 * @Author: 乐涛
 * @LastEditTime: 2022-02-10 15:15:14
-->
<template>
  <div class="m_logo">
    <div>
      <img src="/favicon.ico" :alt="title" />
      <span v-show="!isShrink" class="m_logo_content">{{ title }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive({
      title: import.meta.env.VITE_APP_TITLE,
      isShrink: computed(() => store.state.AppModule.isShrink),
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.m_logo {
  height: 45px;
  background: #333333;
  color: #fff;
  line-height: 45px;
  text-align: center;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
}
</style>
