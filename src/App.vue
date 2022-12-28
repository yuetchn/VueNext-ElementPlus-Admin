<!--
 * @ModuleName: App
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-11-24 12:01:28
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
import { defineComponent, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { Throttle } from "@/utils/func";
import LoadingShade from "@/components/LoadingShade/LoadingShade.vue";
import { localeTypes, useI18n, toggleLocaleAsync } from "@/locale";

export default defineComponent({
  components: { LoadingShade },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const route = useRoute();
    const elementLocle = computed(() => {
      const locale = localeTypes.find((f) => f.key === store.state.AppModule.locale);
      if (locale) {
        return locale.elementUI;
      }
      return "";
    }) as any;
    const elementSize = computed(() => (store.state.AppModule.size)) as any
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

    // 侦听语言切换
    watch(
      () => store.state.AppModule.locale,
      () => {
        document.title = (route.meta.title ? `${ t(route.name?.toString() || "") === route.name ? route.meta.title : t(route.name?.toString() || "") } - ` : "") + import.meta.env.VITE_APP_TITLE;
      },
      { immediate: true },
    );

    watch(
      () => route,
      async (to) => {
        await toggleLocaleAsync(to.query.lang as string);
        document.title = (to.meta.title ? `${ t(to.name?.toString() || "") === to.name ? to.meta.title : t(to.name?.toString() || "") } - ` : "") + import.meta.env.VITE_APP_TITLE;
      },
      { immediate: true, deep: true },
    );

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