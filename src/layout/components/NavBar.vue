<!--
 * @ModuleName: Main
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 10:16:59
-->
<template>
  <div class="m_navbar">
    <div class="m_left_bread">
      <g-svg-icon name="shrink" size="22" style="cursor: pointer" color="#A4A4A4" :class="{ shrink: isShrink }" @click="check"></g-svg-icon>
      <BreadCrumbs class="u_bread_crumbs"></BreadCrumbs>
    </div>
    <div style="padding: 5px 25px; border: 1px solid blue" @click="loginOut">退出</div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import BreadCrumbs from "./BreadCrumbs.vue";

export default defineComponent({
  components: { BreadCrumbs },
  setup() {
    const store = useStore();

    const isShrink = computed(() => store.state.AppModule.isShrink);
    const loginOut = () => {
      store.dispatch("UserModule/loginOut");
    };

    const check = () => {
      store.dispatch("AppModule/set_shrink", !isShrink.value);
    };

    return {
      loginOut,
      check,
      isShrink,
    };
  },
});
</script>
<style lang="scss" scoped>
.m_navbar {
  padding: 0 8px;
  height: 45px;
  box-shadow: 2px 0 5px 2px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.shrink {
  transform: rotate(180deg);
}

.m_left_bread {
  display: flex;
  align-items: center;

  .u_bread_crumbs {
    margin-left: 30px;
  }
}
</style>
