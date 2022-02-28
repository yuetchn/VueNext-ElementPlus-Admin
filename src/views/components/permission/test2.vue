<!--
 * @ModuleName: Permissin Test
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 15:52:09
-->
<template>
  <div>
    <el-card>
      <template #header>权限说明</template>
      <div>
        <p>
          调用UserStore中的 login 方法切换用户<br />
          切换用户后根据接口返回的菜单以及角色生成动态路由表:<br />
          避免刷新后动态路由丢失问题，动态路由生成放到了路由拦截里面<br />
          <br />
        </p>
      </div>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>切换权限</template>
      <div>
        <h4>当前用户：{{ userName }}</h4>
        <el-button type="primary" @click="toggleUser(1)">切换到Admin</el-button>
        <el-button type="primary" @click="toggleUser(2)">切换到Test</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";

const store = useStore();
const router = useRouter();
const route = useRoute();

const userName = computed(() => store.state.UserModule.userName);
const toggleUser = async (type: number) => {
  switch (type) {
    case 1:
      await store.dispatch("UserModule/login", { account: "admin", password: "" });
      break;
    case 2:
      await store.dispatch("UserModule/login", { account: "test", password: "" });
      break;
    default:
      break;
  }
  router.replace(route.path);
};
</script>
