<!--
 * @ModuleName: App
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 09:49:43
-->
<template>
  <suspense>
    <router-view />
  </suspense>
  <g-loading-shade></g-loading-shade>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { Throttle } from "@/utils/func";

export default defineComponent({
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("AppModule/setClientWidth", document.body.clientWidth);

      const onResize = new Throttle().use(() => {
        store.dispatch("AppModule/setClientWidth", document.body.clientWidth);
      }, 200);

      window.addEventListener("resize", () => {
        onResize();
      });
    });
  },
});
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
}
</style>
