<!--
 * @ModuleName: NavBar
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-10 08:22:35
-->
<template>
  <div class="m_navbar">
    <div class="m_left_bread">
      <div class="m_shrink" @click="check">
        <g-svg-icon name="shrink" size="18" color="#606266" :class="{ shrink: isShrink }"></g-svg-icon>
      </div>
      <BreadCrumbs class="u_bread_crumbs"></BreadCrumbs>
    </div>
    <div class="m_right">
      <el-dropdown class="u_nav_item">
        <div><g-svg-icon size="20" color="#A4A4A4" name="locale" /></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item of localeList" :key="item.key" :disabled="$store.state.AppModule.locale === item.key" @click="setLocale(item.key)">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip :content="$t('refresh')" placement="bottom">
        <div class="u_nav_item" @click="reload">
          <g-svg-icon size="20" color="#A4A4A4" name="refresh" />
        </div>
      </el-tooltip>
      <el-tooltip :content="$t('fullScreen')" placement="bottom">
        <div class="u_nav_item" @click="toggleScreen">
          <g-svg-icon size="20" color="#A4A4A4" :name="isOpen ? 'no-fullscreen' : 'fullscreen'" />
        </div>
      </el-tooltip>

      <div class="m_right_dropdown">
        <el-dropdown>
          <div class="u_name">{{ $t("hellow") }},{{ userName }}</div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/user')">{{ $t("userCenter") }}</el-dropdown-item>
              <el-dropdown-item @click="loginOut">{{ $t("loginOut") }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import screenfull from "screenfull";
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import BreadCrumbs from "./BreadCrumbs.vue";
import { localeTypes, toggleLocale } from "@/locale";

export default defineComponent({
  components: { BreadCrumbs },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const localeList = localeTypes;

    const isOpen = ref(screenfull.isFullscreen);
    const isShrink = computed(() => store.state.AppModule.isShrink);
    const userName = computed(() => store.state.UserModule.userName);
    const loginOut = () => {
      store.dispatch("UserModule/loginOut");
    };

    const check = () => {
      store.dispatch("AppModule/set_shrink", !isShrink.value);
    };

    const setLocale = (key: string) => toggleLocale(key);

    const toggleScreen = () => {
      if (!screenfull.isEnabled) {
        message.error("您的浏览器不支持全屏功能！");
        return;
      }

      if (screenfull.isFullscreen) {
        screenfull.exit();
        return;
      }
      screenfull.toggle();
    };

    const reload = () => router.replace({ path: `/redirect${ route.fullPath }` });

    onMounted(() => {
      window.addEventListener("fullscreenchange", () => {
        isOpen.value = !isOpen.value;
      });
    });

    return {
      localeList,
      // computed
      isShrink,
      userName,
      isOpen,

      // func
      loginOut,
      check,
      toggleScreen,
      reload,
      setLocale,
    };
  },
});
</script>
<style lang="scss" scoped>
.m_navbar {
  height: 45px;
  // box-shadow: 2px 0 5px 2px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}

.m_shrink {
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  transition: background-color 0.5s;

  .shrink {
    transform: rotate(180deg);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
}

.m_left_bread {
  display: flex;
  align-items: center;
  height: 100%;

  .u_bread_crumbs {
    margin-left: 15px;
  }
}

.m_right {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.m_right_dropdown {
  padding-right: 20px;
  margin-left: 10px;
  cursor: pointer;

  .u_name {
    width: 120px;
    overflow: hidden;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
  }
}

.u_nav_item {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #a4a4a4;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: #333333;
  }
}
</style>
