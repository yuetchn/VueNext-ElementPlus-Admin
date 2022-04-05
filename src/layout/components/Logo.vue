<!--
 * @ModuleName: Logo
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-05 21:37:04
-->
<template>
  <div class="logo" @click="$router.push('/')">
    <div>
      <img v-if="isShrink" src="/favicon.ico" :alt="title" />
      <img v-if="!isShrink" src="@/assets/logo.png" style="width:auto;height:45px" :alt="title" />
      <span v-if="showLogoTitle" v-show="!isShrink" class="logo_content">{{ title }}</span>
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
      showLogoTitle: import.meta.env.VITE_SHOW_LOGO_TITLE === "true",
    });
    console.log(import.meta.env.VITE_SHOW_LOGO_TITLE)
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
