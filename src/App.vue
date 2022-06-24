<!--
 * @ModuleName: App
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-06-16 10:52:51
-->
<template>
  <el-config-provider :locale="elementLocle" :size="elementSize">
    <suspense>
      <router-view />
    </suspense>
    <LoadingShade></LoadingShade>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "@/store";
import { Throttle } from "@/utils/func";
import LoadingShade from "@/components/LoadingShade/LoadingShade.vue";
import { localeTypes } from "@/locale";

export default defineComponent({
  components: { LoadingShade },
  setup() {
    const store = useStore();
    const elementLocle = <any>computed(() => {
      const locale = localeTypes.find((f) => f.key === store.state.AppModule.locale);
      if (locale) {
        return locale.elementUI;
      }
      return "";
    });
    const elementSize = <any >computed(() => (store.state.AppModule.size))
    onMounted(() => {
      store.dispatch("AppModule/setClientWidth", document.body.clientWidth);

      const onResize = new Throttle().use(() => {
        store.dispatch("AppModule/setClientWidth", document.body.clientWidth);
      }, 200);

      window.addEventListener("resize", () => {
        onResize();
      });
    });

    // 火狐浏览器拖拽阻止新开标签页
    document.body.ondrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
    }

    return {
      elementLocle,
      elementSize,
    };
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
    font-size: 14px;
    color:#333333;
  }

  #app {
    height: 100%;
  }
</style>