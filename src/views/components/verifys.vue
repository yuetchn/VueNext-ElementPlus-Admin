<!--
 * @ModuleName: verify
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-25 16:04:26
-->
<template>
  <div>
    <el-card>
      <template #header>验证</template>
      <div>
        <el-form :model="verifyForm" label-position="top" :rules="verifyRules">
          <el-form-item label="邮箱验证" prop="email" required>
            <el-input v-model="verifyForm.email" placeholder="请输入邮箱进行验证"></el-input>
          </el-form-item>
          <el-form-item label="域名验证" prop="domain" required>
            <el-input v-model="verifyForm.doamin" placeholder="请输入域名进行验证"> </el-input>
          </el-form-item>
          <el-form-item label="Url验证" prop="url" required>
            <el-input v-model="verifyForm.url" placeholder="请输入Url进行验证"> </el-input>
          </el-form-item>
          <el-form-item label="手机号验证" prop="mobile" required>
            <el-input v-model="verifyForm.mobile" placeholder="请输入手机号进行验证"> </el-input>
          </el-form-item>
          <el-form-item label="身份证号验证" prop="idCard" required>
            <el-input v-model="verifyForm.idCard" placeholder="请输入身份证号进行验证"> </el-input>
          </el-form-item>
          <el-form-item label="Ipv4验证" prop="ipv4" required>
            <el-input v-model="verifyForm.ipv4" placeholder="请输入IP进行验证"> </el-input>
          </el-form-item>
          <el-form-item label="账号验证" prop="account" required>
            <el-input v-model="verifyForm.account" placeholder="请输入账号进行验证"> </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card style="margin-top: 15px">
      <template #header>说明</template>
      <div>utils包中的<b>verifys</b>模块包含了基本验证规则,可配合Element表单完成基本验证。</div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { NewVerify } from "@/utils/verifys";

export default defineComponent({
  setup() {
    const v = new NewVerify()
    const state = reactive({
      verifyForm: {
        email: "",
        doamin: "",
        url: "",
        mobile: "",
        idCard: "",
        ipv4: "",
        account: "",
      },
      verifyRules: {
        email: [
          v.Email(),
        ],
        domain: [
          v.Domain(),
        ],
        url: [
          v.Url(), 
        ],
        mobile: [
          v.Mobile(), 
        ],
        idCard: [
          v.IdCard(), 
        ],
        ipv4: [
          v.Ipv4(), 
        ],
        account: [
          v.Account(), 
        ],
      },
    });

    return {
      // refs
      ...toRefs(state),
    };
  },
});
</script>
