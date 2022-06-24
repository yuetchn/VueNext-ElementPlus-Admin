<template>
  <div id="userLayout">
    <div class="login_panle">
      <div class="login_panle_form">
        <div class="login_panle_form_title">
          <img class="login_panle_form_title_logo" src="../../assets/logo.png">
        </div>
        <el-form ref="loginFormRef  " :model="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.account" placeholder="请输入用户名">
              <template #suffix>
                <span class="input-icon">
                  <g-svg-icon name="user" size="22" />
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" @keydown.enter="login()">
              <template #suffix>
                <span class="input-icon">
                  <g-svg-icon name="password" size="22" />
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="!loginForm.password||!loginForm.account" type="primary" size="large" style="width:100%" @click="login()">
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_panle_right" />
      <div class="login_panle_foot">
        <div class="links">
          <a href="http://doc.yuetchn.top/#/" target="_blank">
            <img src="@/assets/imgs/login/docs.png" class="link-icon">
          </a>
          <a href="https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin" target="_blank">
            <img src="https://toscode.gitee.com/static/images/logo-en.svg" class="link-icon">
          </a>
          <a href="https://github.com/yuetchn/VueNext-ElementPlus-Admin" target="_blank">
            <img src="@/assets/imgs/login/github.png" class="link-icon">
          </a>
        </div>
        <div class="copyright">
          Copyright © 2022 {{ title }}
        </div>
      </div>
    </div>
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
  #userLayout {
    margin: 0;
    padding: 0;
    background-image: url("@/assets/imgs/login/login_background.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;

    .input-icon {
      padding:3px 0;
    }

    .login_panle {
      position: absolute;
      top: 3vh;
      left: 2vw;
      width: 96vw;
      height: 94vh;
      background-color: rgba(255, 255, 255, .8);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .login_panle_right {
        background-image: url("@/assets/imgs/login/login_left.svg");
        background-size: cover;
        width: 40%;
        height: 60%;
        float: right !important;
      }

      .login_panle_form {
        width: 420px;
        background-color: #fff;
        padding: 40px 40px 40px 40px;
        border-radius: 10px;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, .2);

        .login_panle_form_title {
          display: flex;
          align-items: center;
          margin: 20px 0;
          justify-content: center;

          .login_panle_form_title_logo {
            width: 285px;
            height: 120px;
          }

          .login_panle_form_title_p {
            font-size: 40px;
            padding-left: 20px;
          }
        }

        .vPicBox {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .vPic {
          width: 33%;
          height: 38px;
          background: #ccc;

          img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
      }

      .login_panle_foot {
        position: absolute;
        bottom: 20px;

        .links {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .link-icon {
            width: 30px;
            height: 30px;
          }
        }

        .copyright {
          color: #777777;
          margin-top: 5px;
          text-align: center;
        }
      }
    }
  }

  //小屏幕不显示右侧，将登陆框居中
  @media (max-width: 750px) {
    .login_panle_right {
      display: none;
    }

    .login_panle {
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
    }

    .login_panle_form {
      width: 100%;
    }
  }
</style>