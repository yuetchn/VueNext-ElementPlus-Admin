<!--
 * @ModuleName: 
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 17:53:40
-->
<template>
  <div class="m_login">
    <img src="@/assets/logo.png" />
    <h2>Hi,Welcome~</h2>
    <el-link type="primary" @click="login">进入DEMO</el-link>
    <button v-copy:data="'ffffff'" @click="test">写入剪切板</button>
  </div>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { md5 } from "@/utils/func";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({});

    const login = async () => {
      const { data } = await store.dispatch("UserModule/login", {
        account: "admin",
        password: md5("123456"),
      });
      if (data.code === 200) {
        message.success(data.info);
        router.push("/");
      }
    };

    const test = () => {
      navigator.clipboard.writeText("测试");
    };

    return {
      // refs
      ...toRefs(state),

      // func
      login,
      test,
    };
  },
});
</script>
<style lang="scss" scoped>
.m_login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  img {
    width: 180px;
    height: 180px;
  }
}
</style>
