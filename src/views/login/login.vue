<template>
  <div class="login-container">
    <!-- <el-alert title="Gitee仓库地址：https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin" type="success" :closable="false" style="position: fixed"></el-alert> -->
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form ref="form" :model="loginForm" class="login-form" label-position="left">
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form-item style="margin-top: 40px" prop="username">
            <span class="svg-container svg-container-admin">
              <!-- <vab-icon :icon="['fas', 'user']" /> -->
              <g-svg-icon :size="16" style="z-index:99999;position:relative;" name="user" />
            </span>
            <el-input v-model.trim="loginForm.account" placeholder="请输入用户名" tabindex="1" type="text" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <g-svg-icon :size="16" style="z-index:99999;position:relative;" name="password" />
              <!-- <vab-icon :icon="['fas', 'lock']" /> -->
            </span>
            <el-input v-model.trim="loginForm.password" tabindex="2" placeholder="请输入密码" @keyup.enter="login" />
            <!-- <span v-if="passwordType === 'password'" class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
            </span> -->
            <!-- <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"></vab-icon>
            </span> -->
          </el-form-item>
          <el-button :loading="loading" class="login-btn" type="primary" @click="login">
            登录
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { message } from "ant-design-vue";

import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { MD5 } from "@/utils/func";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      title: import.meta.env.VITE_APP_TITLE,
      loading: false,
      loginForm: {
        account: "admin",
        password: "123456",
      },
    });
    const login = async () => {
      const { data } = await store.dispatch("UserModule/login", {
        account: state.loginForm.account,
        password: MD5(state.loginForm.password),
      });
      if (data.code === 200) {
        message.success(data.info);
        router.push("/");
      }
    };

    return {
      // refs
      ...toRefs(state),

      // func
      login,
    };
  },
})
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url('@/assets/imgs/login/background.jpg') center center fixed no-repeat;
    background-size: cover;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 50px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 425px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: 14px;
      // color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        // color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 7px;
      left: 15px;
      // z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep(.el-form-item) {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;
    }

    ::v-deep(.el-input) {
      box-sizing: border-box;

      input {
        height: 50px;
        padding-left: 45px;
        // font-size: $base-font-size-default;
        line-height: 58px;
        // color: $base-font-color;
        // background: #f6f4fc;
        border: 0;
        // caret-color: $base-font-color;
      }
    }

  }
</style>