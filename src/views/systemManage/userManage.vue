<!--
 * @ModuleName: 用户管理
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-20 10:01:27
-->
<template>
  <div class="app-container">
    <g-table v-model:page-number="searchForm.page_number" v-model:page-size="searchForm.page_size" page :total="searchForm.total" :data="tableData" :columns="tableColumns" @page-change="init()">
      <el-form inline @submit.prevent>
        <el-form-item>
          <el-input v-model.trim="searchForm.keyword" clearable placeholder="用户名、昵称" @clear="init(true)" @keydown.enter="init(true)" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.query.role_ids" style="width:200px" multiple placeholder="角色" clearable :loading="roleListLoading" @clear="init(true)" @change="init(true)" @click="getRoleList()">
            <el-option v-for="(item,i) in roleList" :key="i" :label="item.role_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="init(true)">
            <g-svg-icon name="search" />
          </el-button>
          <el-button type="primary" @click="visible=true">
            <g-svg-icon name="add" />
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 角色 -->
      <template #roles="{row}">
        <el-tag v-for="(item,i) in row.role_list" :key="i" :type="item.status===0?'danger':'success'" class="role_tag">
          {{ item.role_name }}
          <span v-if="item.status===0" class="tag_disibled">[禁]</span>
        </el-tag>
      </template>

      <!-- 状态 -->
      <template #status="{row}">
        <el-tag v-if="row.status">启用</el-tag>
        <el-tag v-else>禁用</el-tag>
      </template>

      <template #cz="{row}">
        <g-link icon="edit" :disabled="row.account==='admin'" type="primary" right="10" @click="editRow(row.id)">编辑</g-link>
        <g-link icon="delete" :disabled="row.account==='admin'" type="danger" @click="deleteRow()">删除</g-link>
      </template>
    </g-table>

    <!-- 新增/编辑用户信息 -->
    <g-dialog v-model="visible" width="700px" :title="formType==='add'?'新增用户':formType==='edit'?'编辑用户':'查看用户'" @open="dialogOpen()" @close="dialogClose()">
      <el-form ref="userFormRef" v-loading="userFormLoading" :rules="userFormRules" :model="userForm" label-suffix="：" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="账号" prop="account">
              <el-input v-model.trim="userForm.account" :disabled="formType!=='add'" placeholder="账号" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nick_name">
              <el-input v-model.trim="userForm.nick_name" placeholder="昵称" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formType==='add'" :gutter="20">
          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input v-model.trim="userForm.password" placeholder="密码" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="password2">
              <el-input v-model.trim="userForm.password2" placeholder="确认密码" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="userForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model.trim="userForm.email" placeholder="邮箱地址" maxlength="100" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色" prop="role_ids">
              <el-select v-model="userForm.role_ids" multiple clearable>
                <el-option v-for="(item,i) in roleList" :key="i" :label="item.role_name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="userForm.status" active-text="启用" :active-value="1" :inactive-value="0" inactive-text="禁用"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="visible=false">取消</el-button>
        <el-button :loading="userFormLoading" type="primary" @click="userFormSubmit()">确认</el-button>
      </template>
    </g-dialog>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive, nextTick } from "vue"
import { SearchForm, TableColumns, FormInstance } from "@base"
import { message } from "ant-design-vue"
import { NewVerify } from "@/utils/verifys"
import { MD5 } from "@/utils/func"
import { GetUserInfoByPage, GetUserInfoByID, SaveOrUpdateUser } from "@/api/v1/system/user"
import { GetRoleByPage } from "@/api/v1/system/role"

export default {
  name: "userManage",
}
</script>
<script lang="ts" setup>
const v = new NewVerify()
const searchForm = reactive(new SearchForm({
  role_ids: [],
}))
const tableData = ref < any[] >([])
const visible = ref(false)
const userFormLoading = ref(false)
const roleListLoading = ref(false)
const formType = ref < "add" | "edit" | "view" >("add")
const tableColumns = < TableColumns[] > [{
  label: "编号",
  prop: "id",
  width: "100px",
},
{
  label: "用户名",
  prop: "account",
},
{
  label: "昵称",
  prop: "nick_name",
},
{
  label: "角色",
  prop: "roles",
  slot: true,
  minWidth: "150px",
},
{
  label: "状态",
  prop: "status",
  align: "center",
  width: "100px",
  slot: true,
},
{
  label: "邮箱",
  prop: "email",
},
{
  label: "签名",
  prop: "sign",
},
{
  label: "创建时间",
  prop: "create_time",
},
{
  label: "操作",
  prop: "cz",
  slot: true,
  width: "180px",
  align: "center",
  fixed: "right",
},
]
const userFormRef = ref < FormInstance >()
const userForm = reactive({
  id: 0,
  account: "",
  nick_name: "",
  password: "",
  password2: "",
  email: "",
  sex: 1,
  status: 1,
  role_ids: [],
})
const userFormRules = {
  account: [v.Required("账号")],
  nick_name: [v.Required("昵称")],
  password: [v.Required("密码"), v.Password()],
  email: [v.Email()],
  password2: [
    v.Required("确认密码"),
    v.Password(),
    { validator: (r: any, v: any, call: any) => (v !== userForm.password ? call(new Error("两次密码不一致")) : call()) },
  ],
}
const roleList = ref < any[] >([])

onMounted(() => {
  init()
})

const init = async (reset = false) => {
  if (reset) {
    searchForm.ResetPage()
  }
  const { data } = await GetUserInfoByPage(searchForm)
  if (data.code === 200) {
    tableData.value = data.data.list
    searchForm.total = data.data.total
  }
}

const dialogOpen = async () => {
  await getRoleList()
}

const dialogClose = () => {
  userFormRef.value?.resetFields();
  userForm.id = 0;

  nextTick(() => {
    formType.value = "add";
  })
}

const getRoleList = async () => {
  try {
    roleListLoading.value = true
    const { data } = await GetRoleByPage(new SearchForm(null, 999999))
    if (data.code === 200) {
      roleList.value = data.data.list
    } else {
      return new Error(data.msg)
    }
  } catch (error:any) {
    message.error(error)
  } finally {
    roleListLoading.value = false
  }
}

const userFormSubmit = () => {
  userFormRef.value?.validate(async (v) => {
    if (!v) {
      return
    }
    try {
      userFormLoading.value = true
      const { data } = await SaveOrUpdateUser({
        ...userForm,
        password: userForm.password && MD5(userForm.password),
      })
      if (data.code === 200) {
        message.success(data.msg)
        visible.value = false
        init()
      } else {
        return new Error(data.msg)
      }
    } catch (error:any) {
      message.error(error)
    } finally {
      userFormLoading.value = false
    }
  })
}

const editRow = async (id: number) => {
  formType.value = "edit"
  const { data } = await GetUserInfoByID(id)
  if (data.code === 200) {
    Object.assign(userForm, data.data)
    visible.value = true
  }
}

const deleteRow = async () => {
  message.warning("达咩 达咩，这个不能删除哟~")
}
</script>
<style lang="scss" scoped>
  .role_tag {
    margin-right: 5px;
    margin-bottom: 5px;

    .tag_disibled {
      color: $color-danger;
    }
  }
</style>