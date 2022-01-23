<!--
 * @ModuleName: Main
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 14:46:01
-->
<template>
  <div class="m_navbar">
    <div class="m_left_bread">
      <div class="m_shrink">
        <g-svg-icon name="shrink" size="22" style="cursor: pointer" color="#A4A4A4" :class="{ shrink: isShrink }" @click="check"></g-svg-icon>
      </div>
      <BreadCrumbs class="u_bread_crumbs"></BreadCrumbs>
    </div>
    <div class="m_right_dropdown">
      <el-dropdown>
        <div class="u_name">你好,{{ userName }}</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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
    const userName = computed(() => store.state.UserModule.userName)
    const loginOut = () => {
      store.dispatch("UserModule/loginOut");
    };

    const check = () => {
      store.dispatch("AppModule/set_shrink", !isShrink.value);
    };

    return {
      // computed
      isShrink,
      userName,

      // func
      loginOut,
      check,

    };
  },
});
</script>
<style lang="scss" scoped>
  .m_navbar {
    height: 45px;
    box-shadow: 2px 0 5px 2px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .m_shrink {
    height: 100%;
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
      margin-left: 20px;
    }
  }

  .m_right_dropdown {
    padding: 0 20px;
    cursor: pointer;

    .u_name {
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>