<!--
 * @ModuleName: App
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 13:29:45
-->
<template>
  <suspense>
    <router-view />
  </suspense>
  <LoadingShade></LoadingShade>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { Throttle } from "@/utils/func";
import LoadingShade from "@/components/LoadingShade/LoadingShade.vue";

export default defineComponent({
  components: { LoadingShade },
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
