<!--
 * @ModuleName: Logo
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-30 20:14:03
-->
<template>
  <div class="logo">
    <div>
      <img src="/favicon.ico" :alt="title" />
      <span v-show="!isShrink" class="logo_content">{{ title }}</span>
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
.logo {
  height: 45px;
  background: $g-silderBar-logo-background-color;
  color: $g-silderBar-logo-color;
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
