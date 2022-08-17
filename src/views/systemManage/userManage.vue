<!--
 * @ModuleName: 用户管理
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-17 14:15:21
-->
<template>
  <div class="app-container">
    <g-table v-model:page-number="searchForm.page_number" v-model:page-size="searchForm.page_size" page :total="searchForm.total" :data="tableData" :columns="tableColumns" @page-change="init()">
      <el-form inline @submit.prevent>
        <el-form-item>
          <el-input v-model.trim="searchForm.keyword" clearable placeholder="用户名、昵称" @clear="init(true)" @keydown.enter="init(true)" />
        </el-form-item>
        <el-form-item>
          <el-button @click="init(true)">
            <g-svg-icon name="search" />
          </el-button>
        </el-form-item>
      </el-form>
    </g-table>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive } from "vue"
import { SearchForm, TableColumns } from "@base"
import { GetUserInfoByPage } from "@/api/v1/system/user"

export default {
  name: "userManage",
}
</script>
<script lang="ts" setup>
const searchForm = reactive(new SearchForm())
const tableData = ref<any[]>([])
const tableColumns = <TableColumns[]>[
  {
    label: "编号",
    prop: "id",
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
]
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
</script>
<style lang="scss" scoped>
</style>